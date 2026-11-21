<template>
  <div>
    <hero-image />
    <v-container class="content" fluid>
      <page-builder v-if="data" :blocks="data.homePage?.content" />
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const SITE_QUERY = groq`*[_id == "siteSettings"][0]{
  homePage->{
    ...,
    content[]{
      ...,
      link{
        ...,
        internalLink->,
      },
      internalLink->,
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
          }
        }
      } 
    }
  }
}`;
const { data } = await useSanityData<SanityDocument>(SITE_QUERY);

const nuxtApp = useNuxtApp();
useSeoMeta({
  title: () => data.value?.homePage?.seo?.metaTitle || "Juno Midwives",
  description: () => data.value?.homePage?.seo?.metaDescription,
  ogTitle: () => data.value?.homePage?.seo?.metaTitle || "Juno Midwives",
  ogDescription: () => data.value?.homePage?.seo?.metaDescription,
  ogImage: () => {
    const img = data.value?.homePage?.seo?.ogImage;
    return img ? (nuxtApp as any).$urlFor(img).width(1200).height(630).url() : undefined;
  },
});
</script>
