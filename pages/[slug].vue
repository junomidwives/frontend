<template>
  <v-container max-width="1000" class="mx-auto">
    <page-builder v-if="data" :blocks="data.content" />
  </v-container>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const route = useRoute();
const { setHeroText } = useHero();

const PAGE_QUERY = groq`*[_type == "page" && slug.current == '${route.params.slug}'][0]`;
const { data } = await useSanityQuery<SanityDocument>(PAGE_QUERY);

setHeroText(data.value?.title);
</script>
