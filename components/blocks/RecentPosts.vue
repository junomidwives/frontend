<template>
  <v-container>
    <h2 v-if="heading" class="text-h5 font-weight-bold mb-8">{{ heading }}</h2>

    <v-row>
      <v-col
        cols="12"
        sm="4"
        v-for="post in displayPosts"
        :key="post._id"
        class="d-flex"
      >
        <v-card flat class="d-flex w-100">
          <v-card-text class="d-flex flex-column justify-space-between">
            <div>
              <NuxtLink v-if="post.image" :to="`${postBasePath}/${post.slug?.current}`">
                <v-img
                  :src="$urlFor(post.image).url()"
                  cover
                  width="100%"
                  :max-height="200"
                  aspect-ratio="1"
                  rounded="lg"
                  class="mb-2"
                />
              </NuxtLink>

              <NuxtLink
                :to="`${postBasePath}/${post.slug?.current}`"
                class="text-h6 line-height-1 font-weight-bold text-surface-variant text-decoration-none"
              >
                {{ post.title }}
              </NuxtLink>
            </div>

            <NuxtLink
              :to="`${postBasePath}/${post.slug?.current}`"
              class="text-body-1 mt-2"
            >
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

const props = defineProps({
  heading: {
    type: String,
    default: "",
  },
  postType: {
    type: String,
    default: "blog",
  },
  posts: {
    type: Array as () => SanityDocument[],
    default: () => [],
  },
  birthStoryPosts: {
    type: Array as () => SanityDocument[],
    default: () => [],
  },
  fallbackPosts: {
    type: Array as () => SanityDocument[],
    default: () => [],
  },
});

const postBasePath = computed(() =>
  props.postType === "birthStory" ? "/birth-stories" : "/blog",
);

const selectedPosts = computed(() =>
  props.postType === "birthStory" ? props.birthStoryPosts : props.posts,
);

const displayPosts = computed(() =>
  selectedPosts.value?.length ? selectedPosts.value : props.fallbackPosts,
);
</script>

<style scoped>
.line-height-1 {
  line-height: 1.1rem !important;
}
</style>
