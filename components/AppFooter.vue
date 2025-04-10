<template>
  <v-footer color="teal-lighten-5">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          md="4"
          class="d-flex align-center justify-center justify-md-start py-2"
          order="3"
          order-md="1"
        >
          <span class="text-caption"> © 2025 junomidwives.co.uk </span>
        </v-col>

        <v-col
          cols="12"
          md="4"
          class="d-flex align-center justify-center justify-md-center ga-4 ga-md-8 py-2"
          order="1"
          order-md="2"
        >
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

        <v-col
          cols="12"
          md="4"
          class="d-flex align-center justify-center justify-md-end ga-2 ga-md-4 py-2"
          order="2"
          order-md="3"
        >
          <nuxt-link
            to="/privacy-policy"
            class="text-caption text-surface-variant"
          >
            Privacy Policy
          </nuxt-link>
          <nuxt-link
            to="/terms-conditions"
            class="text-caption text-surface-variant"
          >
            Terms and Conditions
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
