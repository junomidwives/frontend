import "vuetify/styles";
import { h } from "vue";

// Components and directives are imported per file by vite-plugin-vuetify
// (autoImport in nuxt.config.ts), so only the ones in use are bundled.
import { createVuetify, type IconProps, type IconSet, type ThemeDefinition } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import {
  mdiAlertCircle,
  mdiArrowLeft,
  mdiArrowRight,
  mdiBabyFaceOutline,
  mdiCalendarHeart,
  mdiChevronDown,
  mdiClose,
  mdiEmailFast,
  mdiEmailNewsletter,
  mdiEmailOutline,
  mdiFacebook,
  mdiFileDocumentOutline,
  mdiHeartOutline,
  mdiHomeOutline,
  mdiInstagram,
  mdiMenu,
  mdiMessageTextOutline,
  mdiPhoneOutline,
  mdiStarOutline,
} from "@mdi/js";

/**
 * Icons as inline SVG instead of the Material Design Icons web font (a 393KB
 * font plus CSS for ~7,000 icons, for the ~20 the site uses). Templates keep
 * writing `icon="mdi-arrow-right"`; add any new icon name here.
 */
const ICONS: Record<string, string> = {
  "mdi-alert-circle": mdiAlertCircle,
  "mdi-arrow-left": mdiArrowLeft,
  "mdi-arrow-right": mdiArrowRight,
  "mdi-baby-face-outline": mdiBabyFaceOutline,
  "mdi-calendar-heart": mdiCalendarHeart,
  "mdi-chevron-down": mdiChevronDown,
  "mdi-close": mdiClose,
  "mdi-email-fast": mdiEmailFast,
  "mdi-email-newsletter": mdiEmailNewsletter,
  "mdi-email-outline": mdiEmailOutline,
  "mdi-facebook": mdiFacebook,
  "mdi-file-document-outline": mdiFileDocumentOutline,
  "mdi-heart-outline": mdiHeartOutline,
  "mdi-home-outline": mdiHomeOutline,
  "mdi-instagram": mdiInstagram,
  "mdi-menu": mdiMenu,
  "mdi-message-text-outline": mdiMessageTextOutline,
  "mdi-phone-outline": mdiPhoneOutline,
  "mdi-star-outline": mdiStarOutline,
};

const junoIcons: IconSet = {
  component: (props: IconProps) => {
    const name = typeof props.icon === "string" ? props.icon : "";
    if (import.meta.dev && name.startsWith("mdi-") && !ICONS[name]) {
      console.warn(`[icons] "${name}" isn't in ICONS (plugins/vuetify.ts)`);
    }
    // Vuetify's own aliases ($close, $expand…) are already SVG paths.
    return h(mdi.component, { ...props, icon: ICONS[name] ?? props.icon });
  },
};

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
    icons: {
      defaultSet: "juno",
      aliases,
      sets: { juno: junoIcons },
    },
    theme: {
      defaultTheme: "juno",
      themes: { juno },
    },
  });
  app.vueApp.use(vuetify);
});
