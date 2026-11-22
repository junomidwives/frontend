<template>
  <v-app>
    <!-- First tab stop: jump past the navigation. -->
    <a href="#main-content" class="skip-link">Skip to content</a>
    <app-bar />
    <v-main id="main-content" tabindex="-1">
      <!-- Pages render their own <hero-image>. -->
      <NuxtPage />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script setup lang="ts">
const { getItems } = useNavigationStore();
await getItems();
</script>
