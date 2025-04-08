<template>
  <v-container>
    <h3 class="text-h5 font-weight-bold my-12">
      Welcome to our blog - a place where we'll be musing on topics relating to
      midwifery, pregnancy, childbirth & more
    </h3>

    <v-row>
      <client-only>
        <v-col cols="3" v-for="blog in blogs" :key="blog.id" class="d-flex">
          <v-card flat class="d-flex w-100">
            <v-card-text class="d-flex flex-column justify-space-between">
              <div>
                <NuxtLink v-if="blog.image" :to="getLink(blog)">
                  <v-img
                    :src="$urlFor(blog.image).url()"
                    cover
                    width="100%"
                    max-height="400"
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

                <!-- <p class="mt-2">
                {{ blog.content[0].children[0].text.split(".")[0] + "..." }}
              </p> -->
              </div>

              <NuxtLink :to="getLink(blog)" class="text-body-1">
                Read more
              </NuxtLink>
            </v-card-text>
          </v-card>
        </v-col>
      </client-only>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const { setHeroText } = useHero();
setHeroText("Blog");

const { getBlogs } = useBlogStore();
const { blogs } = storeToRefs(useBlogStore());

await getBlogs();

function getLink(item: SanityDocument) {
  return `/blog/${item.slug?.current}`;
}
</script>

<style scoped>
.line-height-1 {
  line-height: 1.1rem !important;
}
</style>
