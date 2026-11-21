// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import { createResolver } from "@nuxt/kit";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

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

// Preview builds (the QA site) are rendered on request instead of pre-built.
// They let Sanity Studio's Presentation tool show unpublished drafts.
// Visitors without the preview cookie (set via /preview/enable from Studio)
// see published content only, as on the live site.
const isPreview = process.env.SANITY_PREVIEW === "true";

// The live site's address: canonical links, the sitemap and structured data
// all point here (also from the QA site, which isn't indexed).
const SITE_URL = "https://junomidwives.co.uk";

// Pages left out of the sitemap.
const SITEMAP_EXCLUDE = [/^\/preview/, /^\/build-info/, /^\/(200|404)(\.html)?$/];

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  routeRules: {
    ...(isPreview && {
      "/**": { headers: { "X-Robots-Tag": "noindex, nofollow" } },
    }),
    // Read by the Studio (a different origin) for the "Waiting to go live" panel.
    "/build-info.json": {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
      },
    },
  },
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
    ...(isPreview && {
      // Visual editing needs a dated API version. The live site stays on the
      // module default so its queries are unchanged.
      apiVersion: "2021-03-25",
      visualEditing: {
        token: process.env.SANITY_PREVIEW_TOKEN,
        studioUrl:
          process.env.SANITY_STUDIO_URL || "https://juno-midwives.sanity.studio",
        previewMode: true,
        stega: false,
      },
    }),
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
    // After the static build, list every prerendered page in sitemap.xml
    // (robots.txt points search engines to it).
    "nitro:init"(nitro) {
      nitro.hooks.hook("prerender:done", async ({ prerenderedRoutes }) => {
        const paths = prerenderedRoutes
          .filter((r) => !r.error && r.contentType?.startsWith("text/html"))
          .map((r) => r.route.replace(/\/$/, "") || "/")
          .filter((p) => !SITEMAP_EXCLUDE.some((re) => re.test(p)))
          // Old addresses that redirect elsewhere (from Sanity) aren't pages.
          .filter((p) => !nitro.options.routeRules[p]?.redirect)
          .sort();
        const urls = [...new Set(paths)]
          .map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc></url>`)
          .join("\n");
        await writeFile(
          join(nitro.options.output.publicDir, "sitemap.xml"),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        );
      });
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
      htmlAttrs: { lang: "en-GB" },
      link: [{ rel: "icon", type: "image/svg+xml", href: "/img/logo.svg" }],
    },
  },
  runtimeConfig: {
    // Set once when the config loads, i.e. when the build starts.
    buildTime: new Date().toISOString(),
    public: {
      siteUrl: SITE_URL,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || "",
      SENTRY_DSN_PUBLIC: process.env.SENTRY_DSN_PUBLIC || "",
      SENTRY_TRACES_SAMPLE_RATE:
        process.env.NODE_ENV === "production" ? 1 : 0.1,
      // The Sentry plan includes 50 replays a month. Random session sampling
      // used that up in about a week, so only record sessions that hit an error.
      SENTRY_REPLAY_SAMPLE_RATE: 0,
      SENTRY_ERROR_REPLAY_SAMPLE_RATE:
        process.env.NODE_ENV === "production" ? 1 : 0,
    },
  },
  gtag: {
    id: process.env.VITE_GOOGLE_ANALYTICS_ID || "",
  },
  nitro: {
    prerender: {
      failOnError: false,
      routes: ["/build-info.json"],
    },
  },
  sourcemap: true,
});
