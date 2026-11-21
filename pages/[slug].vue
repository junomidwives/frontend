<template>
  <div>
    <hero-image :text="data?.title" />
    <v-container class="content">
      <page-builder v-if="data" :blocks="data.content" />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const route = useRoute();

const PAGE_QUERY = groq`*[_type == "page" && slug.current == '${route.params.slug}'][0]{
  ...,
  content[]{
    ...,
    link{
      ...,
      internalLink->,
    },
    internalLink->,
    cta{
      ...,
      link{
        ...,
        internalLink->,
      }
    },
    _type == "recentPosts" => {
      ...,
      posts[]->{ _id, title, slug, image },
      birthStoryPosts[]->{ _id, title, slug, image }
    },
    "fallbackPosts": select(
      _type == "recentPosts" && postType == "birthStory" => *[_type == "birthStory"] | order(publishedAt desc) [0..2]{ _id, title, slug, image },
      _type == "recentPosts" => *[_type == "blog"] | order(publishedAt desc) [0..2]{ _id, title, slug, image }
    ),
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          ...,
          internalLink->
        },
      },
      _type == "cta" => {
        ...,
        link{
          ...,
          internalLink->,
        }
      },
    }
  },
}`;
const { data } = await useSanityData<SanityDocument>(PAGE_QUERY);

if (!data.value?._id) {
  throw createError({ statusCode: 404, fatal: true });
}

const nuxtApp = useNuxtApp();
useSeoMeta({
  title: () => `${data.value?.seo?.metaTitle || data.value?.title} | Juno Midwives`,
  description: () => data.value?.seo?.metaDescription,
  ogTitle: () => data.value?.seo?.metaTitle || data.value?.title,
  ogDescription: () => data.value?.seo?.metaDescription,
  ogImage: () => {
    const img = data.value?.seo?.ogImage;
    return img ? (nuxtApp as any).$urlFor(img).width(1200).height(630).url() : undefined;
  },
});
</script>
