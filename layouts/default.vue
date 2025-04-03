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
import type { SanityDocument } from "@sanity/client";

const SITE_QUERY = groq`*[_id == "siteSettings"][0]{mainNav[]->{slug, title, category}}`;
const { data } = await useSanityQuery<SanityDocument>(SITE_QUERY);

const { setMenuItems } = useNavigation();
setMenuItems(data.value?.mainNav);
</script>
