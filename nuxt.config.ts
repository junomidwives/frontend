// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { createResolver } from "@nuxt/kit";
import { sentryVitePlugin } from "@sentry/vite-plugin";

const { resolve } = createResolver(import.meta.url);

// Fetches editor-managed 301/302 redirects (e.g. for renamed page slugs) from
// Sanity and turns them into Nitro routeRules, so Nitro's Netlify preset can
// bake them into the static site's `_redirects` file at build time.
async function fetchRedirectRouteRules() {
  const projectId = process.env.SANITY_PROJECT_ID;
  if (!projectId) return {};

  const query = encodeURIComponent(
    `*[_type == "redirect" && defined(source) && defined(destination)]{source, destination, permanent}`,
  );

  try {
    const response = await fetch(
      `https://${projectId}.apicdn.sanity.io/v1/data/query/production?query=${query}`,
    );
    if (!response.ok) {
      throw new Error(`Sanity responded with ${response.status}`);
    }

    const { result } = (await response.json()) as {
      result: { source: string; destination: string; permanent?: boolean }[];
    };

    return Object.fromEntries(
      result.map(({ source, destination, permanent }) => [
        source,
        { redirect: { to: destination, statusCode: permanent === false ? 302 : 301 } },
      ]),
    );
  } catch (error) {
    console.warn("[redirects] Could not fetch redirects from Sanity, continuing without them:", error);
    return {};
  }
}

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
    "@nuxtjs/google-fonts",
    "@nuxtjs/sanity",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-calendly",
    "nuxt-gtag",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    plugins: [
      process.env.NODE_ENV === "production" &&
        sentryVitePlugin({
          authToken: process.env.SENTRY_AUTH_TOKEN || "",
          org: "juno-midwives",
          project: "frontend",
          telemetry: false,
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
          autoImport: true,
          styles: { configFile: resolve("./settings.scss") },
        }),
      );
    },
    async "nitro:config"(nitroConfig) {
      nitroConfig.routeRules = {
        ...nitroConfig.routeRules,
        ...(await fetchRedirectRouteRules()),
      };
    },
  },

  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/img/logo.svg" }],
    },
  },
  runtimeConfig: {
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || "",
      SENTRY_DSN_PUBLIC: process.env.SENTRY_DSN_PUBLIC || "",
      SENTRY_TRACES_SAMPLE_RATE:
        process.env.NODE_ENV === "production" ? 1 : 0.1,
      SENTRY_REPLAY_SAMPLE_RATE:
        process.env.NODE_ENV === "production" ? 0.1 : 0,
      SENTRY_ERROR_REPLAY_SAMPLE_RATE:
        process.env.NODE_ENV === "production" ? 0.1 : 0,
    },
  },
  gtag: {
    id: process.env.VITE_GOOGLE_ANALYTICS_ID || "",
  },
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
  sourcemap: true,
});
