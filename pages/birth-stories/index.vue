<template>
  <v-container>
    <h3 class="text-h5 font-weight-bold my-12">
      Birth stories shared by the families we've cared for, written in their own
      words
    </h3>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="story in birthStories"
        :key="story.id"
        class="d-flex"
      >
        <v-card flat class="d-flex">
          <v-card-text class="d-flex flex-column justify-space-between">
            <div>
              <NuxtLink :to="getLink(story)">
                <v-img
                  :src="$urlFor(story.image).url()"
                  cover
                  width="100%"
                  :max-height="smAndUp ? 400 : 200"
                  aspect-ratio="1"
                  rounded="lg"
                  class="mb-2"
                />
              </NuxtLink>

              <NuxtLink
                :to="getLink(story)"
                class="text-h6 line-height-1 font-weight-bold text-surface-variant text-decoration-none"
              >
                {{ story.title }}
              </NuxtLink>

              <p class="mt-2">
                {{ story.content[0].children[0].text.split(".")[0] + "..." }}
              </p>
            </div>

            <NuxtLink :to="getLink(story)" class="text-body-1">
              Read more
            </NuxtLink>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useBirthStoriesStore } from "~/stores/birthStories";
import type { SanityDocument } from "@sanity/client";
import { useDisplay } from "vuetify";

const { setHeroText } = useHero();
setHeroText("Birth Stories");

const { smAndUp } = useDisplay();

const { getBirthStories } = useBirthStoriesStore();
const { birthStories } = storeToRefs(useBirthStoriesStore());
await getBirthStories();

function getLink(item: SanityDocument) {
  return `/birth-stories/${item.slug.current}`;
}
</script>

<style scoped>
.line-height-1 {
  line-height: 1.1rem !important;
}
</style>
