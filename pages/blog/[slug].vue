<template>
  <v-container v-if="blog" max-width="1000" class="mx-auto">
    <v-img
      :src="$urlFor(blog.image).size(800, 500).url()"
      cover
      width="100%"
      max-height="500"
      aspect-ratio="1"
      rounded="xl"
      class="mt-10"
    />

    <h2 class="text-h4 font-weight-bold mt-8 mb-2">{{ blog.title }}</h2>
    <p class="text-body-2 mb-8">{{ formattedDate }}</p>

    <div class="text-body-1">
      <SanityContent :blocks="blog.content?.body" :serializers="serializers" />
    </div>

    <v-divider class="mt-16" />

    <v-row>
      <v-col cols="11" sm="6">
        <v-hover>
          <template #default="{ isHovering, props }">
            <nuxt-link
              v-if="previousBlog"
              v-bind="props"
              :to="`/blog/${previousBlog.slug.current}`"
              class="d-flex align-center justify-start ga-4 text-decoration-none text-surface-variant py-1 py-md-4 h-100"
              :class="{ 'bg-grey-lighten-5': isHovering }"
            >
              <v-icon>mdi-arrow-left</v-icon>
              <div class="d-flex flex-column">
                <span class="text-button font-weight-bold"> Previous </span>
                <span class="text-body-2 text-md-body-1 mt-n2 text-wrap">
                  {{ previousBlog.title }}
                </span>
              </div>
            </nuxt-link>
          </template>
        </v-hover>
      </v-col>

      <v-col offset="1" offset-sm="0" cols="11" sm="6">
        <v-hover>
          <template #default="{ isHovering, props }">
            <nuxt-link
              v-bind="props"
              v-if="nextBlog"
              :to="`/blog/${nextBlog.slug.current}`"
              class="d-flex align-center justify-end ga-4 text-decoration-none text-surface-variant py-1 py-md-4 h-100"
              :class="{ 'bg-grey-lighten-5': isHovering }"
            >
              <div class="d-flex flex-column align-end">
                <span class="text-button font-weight-bold"> Next </span>
                <span class="text-body-2 text-md-body-1 mt-n2 text-wrap">
                  {{ nextBlog.title }}
                </span>
              </div>
              <v-icon>mdi-arrow-right</v-icon>
            </nuxt-link>
          </template>
        </v-hover>
      </v-col>
    </v-row>

    <v-divider />
  </v-container>
</template>

<script setup lang="ts">
import CTA from "@/components/blocks/CTA.vue";
import Image from "~/components/blocks/Image.vue";

const route = useRoute();
const { showHero } = useHero();

const { getBlog, getBlogs } = useBlogStore();
const { blog, blogs } = storeToRefs(useBlogStore());

await getBlogs();
await getBlog(route.params.slug as string);

const previousBlog = computed(() => {
  if (!blogs.value) return;
  const index = blogs.value.findIndex(
    (story) => story.slug.current === blog.value?.slug.current
  );
  if (index === 0) return null;
  return blogs.value[index - 1];
});

const nextBlog = computed(() => {
  if (!blogs.value) return;
  const index = blogs.value.findIndex(
    (story) => story.slug.current === blog.value?.slug.current
  );
  if (index === blogs.value.length - 1) return null;
  return blogs.value[index + 1];
});

const formattedDate = computed(() => {
  return Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(blog.value?.publishedAt));
});
showHero.value = false;

onBeforeRouteLeave(() => {
  showHero.value = true;
});

const { $renderLink } = useNuxtApp();

const serializers = {
  types: {
    cta: ({ link }: { link: any }) => h(CTA, { link }),
    pdf: (file: any) => h(CTA, { file }),
    link: $renderLink,
    imageBlock: Image,
  },
};
</script>
