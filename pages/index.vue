<template>
  <v-container class="content" fluid>
    <page-builder v-if="data" :blocks="data.homePage?.content" />

    <template v-if="!hasNewsletterBlock">
      <v-divider class="py-6" />
      <newsletter-signup />
    </template>
  </v-container>
</template>

<script setup lang="ts">
import NewsletterSignup from "../components/blocks/NewsletterSignup.vue";
import type { SanityDocument } from "@sanity/client";

const { setHeroText } = useHero();
setHeroText("");

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
        posts[]->,
        birthStoryPosts[]->
      },
      "fallbackPosts": select(
        _type == "recentPosts" && postType == "birthStory" => *[_type == "birthStory"] | order(publishedAt desc) [0..2],
        _type == "recentPosts" => *[_type == "blog"] | order(publishedAt desc) [0..2]
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
const { data } = await useSanityQuery<SanityDocument>(SITE_QUERY);

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

// Editors can place a Newsletter Signup block anywhere on the homepage;
// only fall back to the default form at the bottom if they haven't.
const hasNewsletterBlock = computed(() =>
  data.value?.homePage?.content?.some(
    (block: any) => block._type === "newsletterSignup",
  ),
);
</script>
