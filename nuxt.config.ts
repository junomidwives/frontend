// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { createResolver } from "@nuxt/kit";
import { sentryVitePlugin } from "@sentry/vite-plugin";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
  features: {
    inlineStyles: false,
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/google-fonts",
    "@nuxtjs/sanity",
    "@nuxt/image",
    "@pinia/nuxt",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    plugins: [
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN || "",
        org: "juno-midwives",
        project: "frontend",
      }),
    ],
  },
  googleFonts: {
    families: {
      "DM+Sans": [200, 300, 400, 500, 600, 700],
      "Material+Icons": true,
      "Abril+Fatface": [400],
    },
  },
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "production",
  },
  hooks: {
    "vite:extendConfig": (config) => {
      // @ts-expect-error
      config.plugins.push(
        vuetify({
          styles: { configFile: resolve("./settings.scss") },
        })
      );
    },
  },

  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/img/logo.svg" }],
      script: [
        {
          src: "https://assets.calendly.com/assets/external/widget.js",
          async: true,
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      SENTRY_DSN_PUBLIC: process.env.SENTRY_DSN_PUBLIC || "",
      SENTRY_TRACES_SAMPLE_RATE:
        process.env.NODE_ENV === "production" ? 1 : 0.1,
      SENTRY_REPLAY_SAMPLE_RATE:
        process.env.NODE_ENV === "production" ? 0.1 : 0,
      SENTRY_ERROR_REPLAY_SAMPLE_RATE:
        process.env.NODE_ENV === "production" ? 0.1 : 0,
    },
  },
  sourcemap: true,
});
