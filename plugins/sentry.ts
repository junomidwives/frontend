import * as Sentry from "@sentry/vue";

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
    });
  },
});
