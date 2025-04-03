<template>
  <v-footer app color="teal-lighten-5" height="36">
    <v-container fluid>
      <v-row>
        <v-col cols="4" class="d-flex align-center justify-start">
          <span class="text-caption"> © 2025 junomidwives.co.uk </span>
        </v-col>

        <v-col cols="4" class="d-flex align-center justify-center ga-8">
          <nuxt-link
            href="https://www.instagram.com/junomidwives/"
            target="_blank"
          >
            <v-icon color="surface-variant" icon="mdi-instagram" />
          </nuxt-link>

          <nuxt-link to="/contact-us">
            <v-icon color="surface-variant" icon="mdi-email" />
          </nuxt-link>

          <nuxt-link
            href="https://www.facebook.com/profile.php?id=100093169811850"
            target="_blank"
          >
            <v-icon color="surface-variant" icon="mdi-facebook" />
          </nuxt-link>
        </v-col>

        <v-col cols="4" class="d-flex align-center justify-end ga-4">
          <v-btn
            nuxt
            color="surface-variant"
            variant="text"
            to="/privacy-policy"
            class="text-caption"
          >
            Privacy Policy
          </v-btn>

          <v-btn
            nuxt
            color="surface-variant"
            variant="text"
            to="/terms-conditions"
            class="text-caption"
          >
            Teams and Conditions
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- <div class="d-flex align-center justify-space-between w-100">
      <span class="text-caption"> © 2025 junomidwives.co.uk </span>

      <span class="text-center d-flex align-center ga-6">
        <nuxt-link
          href="https://www.instagram.com/junomidwives/"
          target="_blank"
        >
          <v-icon color="surface-variant" icon="mdi-instagram" />
        </nuxt-link>

        <nuxt-link to="/contact-us">
          <v-icon color="surface-variant" icon="mdi-email" />
        </nuxt-link>

        <nuxt-link
          href="https://www.facebook.com/profile.php?id=100093169811850"
          target="_blank"
        >
          <v-icon color="surface-variant" icon="mdi-facebook" />
        </nuxt-link>
      </span>

      <div class="d-flex align-center justify-end ga-1">
        <v-btn
          nuxt
          color="surface-variant"
          variant="text"
          to="/privacy-policy"
          class="text-caption text-decoration-underline text-surface-variant"
        >
          Privacy Policy
        </v-btn>

        <v-btn
          nuxt
          color="surface-variant"
          variant="text"
          to="/terms-conditions"
          class="text-caption text-decoration-underline text-surface-variant"
        >
          Teams and Conditions
        </v-btn>
      </div>
    </div> -->
  </v-footer>
</template>
