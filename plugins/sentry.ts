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
      integrations: [
        Sentry.browserTracingIntegration({ router }),
        Sentry.replayIntegration(),
      ],

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
  },
});
