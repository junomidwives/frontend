<template>
  <v-container v-if="birthStory" max-width="1000" class="mx-auto">
    <v-img
      :src="$urlFor(birthStory.image).size(800, 500).url()"
      cover
      width="100%"
      max-height="500"
      aspect-ratio="1"
      rounded="xl"
      class="mt-10"
    />

    <h2 class="text-h4 font-weight-bold mt-8 mb-2">{{ birthStory.title }}</h2>
    <p class="text-body-2 mb-8">{{ formattedDate }}</p>

    <div class="text-body-1">
      <SanityContent :blocks="birthStory.content" />
    </div>

    <v-divider class="mt-16 mb-4" />

    <v-row>
      <v-col>
        <v-btn
          v-if="prevousBirthStory"
          nuxt
          :to="`/birth-stories/${prevousBirthStory.slug.current}`"
          prepend-icon="mdi-arrow-left"
          variant="text"
          size="x-large"
        >
          <div class="d-flex flex-column mt-n1">
            <span class="text-button"> Previous </span>
            <span class="text-body-1 mt-n2">
              {{ prevousBirthStory.title }}
            </span>
          </div>
        </v-btn>
      </v-col>

      <v-col class="text-right">
        <v-btn
          v-if="nextBirthStory"
          nuxt
          :to="`/birth-stories/${nextBirthStory.slug.current}`"
          append-icon="mdi-arrow-right"
          variant="text"
          size="x-large"
        >
          <div class="d-flex flex-column mt-n1 align-end">
            <span class="text-button"> Next </span>
            <span class="text-body-1 mt-n2"> {{ nextBirthStory.title }} </span>
          </div>
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="mt-4" />
  </v-container>
</template>

<script setup lang="ts">
import { useBirthStoriesStore } from "~/stores/birthStories";
const route = useRoute();
const { showHero } = useHero();

const { getBirthStory, getBirthStories } = useBirthStoriesStore();
const { birthStory, birthStories } = storeToRefs(useBirthStoriesStore());

await getBirthStories();
await getBirthStory(route.params.slug as string);

useSeoMeta({
  title: () => `${birthStory.value?.title} | Juno Midwives` || "Juno Midwives",
});

const prevousBirthStory = computed(() => {
  const index = birthStories.value.findIndex(
    (story) => story.slug.current === birthStory.value?.slug.current
  );
  if (index === 0) return null;
  return birthStories.value[index - 1];
});

const nextBirthStory = computed(() => {
  const index = birthStories.value.findIndex(
    (story) => story.slug.current === birthStory.value?.slug.current
  );
  if (index === birthStories.value.length - 1) return null;
  return birthStories.value[index + 1];
});

const formattedDate = computed(() => {
  return Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(birthStory.value?.publishedAt));
});
showHero.value = false;

onBeforeRouteLeave(() => {
  showHero.value = true;
});
</script>
