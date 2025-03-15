import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import * as components from "vuetify/components"; // get all components
import * as directives from "vuetify/directives"; // get all directives

import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
  });
  app.vueApp.use(vuetify);
});
