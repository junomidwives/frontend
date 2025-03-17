<template>
  <v-footer app color="teal-lighten-5" height="36">
    <div class="d-flex align-center justify-space-between w-100">
      <span class="text-caption"> © 2025 junomidwives.co.uk </span>
      <span class="text-center d-flex align-center ga-6">
        <nuxt-link
          href="https://www.instagram.com/junomidwives/"
          target="_blank"
        >
          <v-icon icon="mdi-instagram" />
        </nuxt-link>

        <nuxt-link to="/contact-us">
          <v-icon icon="mdi-email" />
        </nuxt-link>

        <nuxt-link
          href="https://www.facebook.com/profile.php?id=100093169811850"
          target="_blank"
        >
          <v-icon icon="mdi-facebook" />
        </nuxt-link>
      </span>
      <div class="d-flex align-center justify-end ga-4">
        <nuxt-link
          to="/privacy-policy"
          class="text-caption text-decoration-underline text-surface-variant"
        >
          Privacy Policy
        </nuxt-link>
        <nuxt-link
          to="/terms-conditions"
          class="text-caption text-decoration-underline text-surface-variant"
        >
          Teams and Conditions
        </nuxt-link>
      </div>
    </div>
  </v-footer>
</template>
