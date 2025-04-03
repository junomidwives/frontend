<template>
  <v-container>
    <h3 class="text-h5 font-weight-medium my-8">
      Birth stories shared by the families we've cared for, written in their own
      words
    </h3>

    <v-row>
      <v-col cols="3" v-for="item in items" :key="item.id" class="d-flex">
        <v-card flat class="d-flex">
          <v-card-text class="d-flex flex-column justify-space-between">
            <div>
              <NuxtLink :to="item?.slug?.current">
                <v-img
                  :src="$urlFor(item?.image).url()"
                  cover
                  width="100%"
                  max-height="400"
                  aspect-ratio="1"
                  rounded="lg"
                  class="mb-2"
                />
              </NuxtLink>

              <NuxtLink
                :to="item?.slug?.current"
                class="text-h6 line-height-1 font-weight-bold text-surface-variant text-decoration-none"
              >
                {{ item?.title }}
              </NuxtLink>

              <p class="mt-2">
                {{ item?.content[0].children[0].text.split(".")[0] + "..." }}
              </p>
            </div>

            <NuxtLink :to="item?.slug?.current" class="text-body-1">
              Read more
            </NuxtLink>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const { setHeroText } = useHero();
setHeroText("Birth Stories");

const BIRTH_STORIES_QUERY = groq`*[_type == "birthStory"]  | order(publishedAt desc)`;
const { data: items } = await useSanityQuery<SanityDocument>(
  BIRTH_STORIES_QUERY
);
</script>

<style scoped>
.line-height-1 {
  line-height: 1.1rem !important;
}
</style>
