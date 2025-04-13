<template>
  <v-container>
    <h3 class="text-h5 font-weight-bold my-12">
      Welcome to our blog - a place where we'll be musing on topics relating to
      midwifery, pregnancy, childbirth & more
    </h3>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="blog in pageBlogs"
        :key="blog.id"
        class="d-flex"
      >
        <v-card flat class="d-flex w-100">
          <v-card-text class="d-flex flex-column justify-space-between">
            <div>
              <NuxtLink v-if="blog.image" :to="getLink(blog)">
                <v-img
                  :src="$urlFor(blog.image).url()"
                  cover
                  width="100%"
                  :max-height="smAndUp ? 400 : 200"
                  aspect-ratio="1"
                  rounded="lg"
                  class="mb-2"
                />
              </NuxtLink>

              <NuxtLink
                :to="getLink(blog)"
                class="text-h6 line-height-1 font-weight-bold text-surface-variant text-decoration-none"
              >
                {{ blog.title }}
              </NuxtLink>
            </div>

            <NuxtLink :to="getLink(blog)" class="text-body-1">
              Read more
            </NuxtLink>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-2 mt-md-8">
      <v-col>
        <v-pagination
          v-model="page"
          :length="pageCount"
          :size="smAndUp ? 'default' : 'x-small'"
          :total-visible="smAndUp ? undefined : 1"
          rounded
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";
import { useDisplay } from "vuetify";

const { setHeroText } = useHero();
setHeroText("Blog");

const { smAndUp } = useDisplay();

const { getBlogs } = useBlogStore();
const { blogs } = storeToRefs(useBlogStore());

await getBlogs();

const page = ref(1);

const pageCount = computed(() => {
  return Math.ceil(blogs.value.length / 8);
});

const pageBlogs = computed(() => {
  return blogs.value.slice((page.value - 1) * 8, page.value * 8);
});

function getLink(item: SanityDocument) {
  return `/blog/${item.slug?.current}`;
}
</script>

<style scoped>
.line-height-1 {
  line-height: 1.1rem !important;
}
</style>
