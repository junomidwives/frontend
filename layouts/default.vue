<template>
  <v-app>
    <app-bar />
    <v-main>
      <hero-image />
      <NuxtPage />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script setup lang="ts">
const { getItems } = useNavigationStore();
await getItems();
</script>
