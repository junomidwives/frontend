import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import * as components from "vuetify/components"; // get all components
import * as directives from "vuetify/directives"; // get all directives

import { createVuetify, type ThemeDefinition } from "vuetify";

/**
 * Juno palette ("A · logo-led"), built from the logo's slate teal and pink.
 * Every colour is available as a Vuetify colour name (`color="deep"`,
 * `bg-tint`, `text-muted`) and as a CSS variable
 * (`rgb(var(--v-theme-deep))`). Text/background pairs pass WCAG AA.
 */
const juno: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    "on-background": "#1F2E35",
    "on-surface": "#1F2E35",

    // Logo teal: buttons, links, active nav. White on it is 6.7:1.
    primary: "#356273",
    "primary-darken-1": "#2A4F5E",
    // Dark teal: quote band, comparison header, step icons, footer.
    secondary: "#22495A",
    deep: "#22495A",

    // Used for nav, footer and card text/icons (Vuetify's default is grey).
    "surface-variant": "#1F2E35",
    "on-surface-variant": "#FFFFFF",

    ink: "#1F2E35", // headings (14:1 on white)
    body: "#3F5058", // paragraphs (8.4:1)
    muted: "#5E7178", // captions, labels (5.1:1)
    mint: "#C1E3D3", // step and comparison cards; Deep text on it is 7:1
    tint: "#EEF4F3", // quiet bands, replaces Material cyan
    pink: "#EBA5A5", // logo pink: decoration only (quote marks, dots, dividers)
    line: "#D9E3E2", // decorative dividers
    field: "#7C8E94", // input borders (3.4:1)
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: "juno",
      themes: { juno },
    },
  });
  app.vueApp.use(vuetify);
});
