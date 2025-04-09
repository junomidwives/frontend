<template>
  <client-only>
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
        <SanityContent :blocks="blog.content.body" :serializers="serializers" />
      </div>

      <v-divider class="mt-16 mb-4" />

      <v-row>
        <v-col>
          <v-btn
            v-if="previousBlog"
            nuxt
            :to="`/blog/${previousBlog.slug.current}`"
            prepend-icon="mdi-arrow-left"
            variant="text"
            size="x-large"
          >
            <div class="d-flex flex-column mt-n1">
              <span class="text-button"> Previous </span>
              <span class="text-body-1 mt-n2">
                {{ previousBlog.title }}
              </span>
            </div>
          </v-btn>
        </v-col>

        <v-col class="text-right">
          <v-btn
            v-if="nextBlog"
            nuxt
            :to="`/blog/${nextBlog.slug.current}`"
            append-icon="mdi-arrow-right"
            variant="text"
            size="x-large"
          >
            <div class="d-flex flex-column mt-n1 align-end">
              <span class="text-button"> Next </span>
              <span class="text-body-1 mt-n2"> {{ nextBlog.title }} </span>
            </div>
          </v-btn>
        </v-col>
      </v-row>

      <v-divider class="mt-4" />
    </v-container>
  </client-only>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import CTA from "@/components/blocks/CTA.vue";
import Image from "~/components/blocks/Image.vue";

const route = useRoute();
const { showHero } = useHero();

const { getBlog, getBlogs } = useBlogStore();
const { blog, previousBlog, nextBlog } = storeToRefs(useBlogStore());

await getBlogs();
await getBlog(route.params.slug as string);

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

const serializers = {
  types: {
    cta: ({ link }: { link: any }) => h(CTA, { link }),
    pdf: (file: any) => h(CTA, { file }),
    link: renderLink,
    imageBlock: Image,
  },
};

function renderLink(link: any, { slots }: any) {
  if (link.type === "internal") {
    let to = link.internalLink.slug.current;
    if (link.anchor) to += `#${link.anchor}`;
    return h(NuxtLink, { to }, slots.default?.());
  }

  return h(NuxtLink, { href: link.url, external: true }, slots.default?.());
}
</script>
