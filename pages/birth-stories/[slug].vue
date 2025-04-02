<template>
  <v-container v-if="data" max-width="1000" class="mx-auto">
    <v-img
      :src="$urlFor(data.image).url()"
      cover
      width="400"
      max-height="400"
      aspect-ratio="1"
      rounded="xl"
    />
  </v-container>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const route = useRoute();
const { showHero } = useHero();

const BIRTH_STORY_QUERY = groq`*[_type == "birthStory" && slug.current == '${route.params.slug}'][0]`;
const { data } = await useSanityQuery<SanityDocument>(BIRTH_STORY_QUERY);

showHero.value = false;

onBeforeRouteLeave(() => {
  showHero.value = true;
});
</script>
