import * as Sentry from "@sentry/vue";

function isNotFoundError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    (error as { statusCode: unknown }).statusCode === 404
  );
}

export default defineNuxtPlugin({
  name: "sentry",
  parallel: true,

  async setup(nuxtApp) {
    const vueApp = nuxtApp.vueApp;
    const router = useRouter();
    const config = useRuntimeConfig();

    Sentry.init({
      app: vueApp,
      dsn: config.public.SENTRY_DSN_PUBLIC ?? null,
      // Session replay is added once the page has loaded (below).
      integrations: [Sentry.browserTracingIntegration({ router })],

      tracesSampleRate: config.public.SENTRY_TRACES_SAMPLE_RATE as number,
      replaysSessionSampleRate: config.public
        .SENTRY_REPLAY_SAMPLE_RATE as number,
      replaysOnErrorSampleRate: config.public
        .SENTRY_ERROR_REPLAY_SAMPLE_RATE as number,

      // Instagram/Facebook's in-app browser injects its own scripts, which
      // throw "Error invoking postMessage: Java object is gone" when the
      // app tears down the webview. Not our code.
      denyUrls: [/^iabjs:\/\//],
      ignoreErrors: ["Java object is gone"],

      beforeSend(event, hint) {
        // A page that doesn't exist throws createError({ statusCode: 404 })
        // so Nuxt shows the 404 page. That's expected, not a bug, but Sentry
        // would otherwise log it as "Error: No error message".
        if (isNotFoundError(hint.originalException)) return null;
        return event;
      },
    });

    // Session replay (kept only when an error happens) is ~70KB of script.
    // Load it from Sentry's CDN once the page is idle, rather than in the
    // main bundle every visitor downloads before the page can run.
    const replayRate =
      Number(config.public.SENTRY_REPLAY_SAMPLE_RATE) ||
      Number(config.public.SENTRY_ERROR_REPLAY_SAMPLE_RATE);
    if (import.meta.client && replayRate > 0) {
      const loadReplay = () =>
        Sentry.lazyLoadIntegration("replayIntegration")
          .then((replay) => Sentry.addIntegration(replay()))
          .catch(() => {
            // Blocked by an ad blocker or offline: errors still report.
          });
      const whenIdle = () =>
        "requestIdleCallback" in window
          ? requestIdleCallback(loadReplay, { timeout: 5000 })
          : setTimeout(loadReplay, 2000);
      if (document.readyState === "complete") whenIdle();
      else window.addEventListener("load", whenIdle, { once: true });
    }
  },
});
