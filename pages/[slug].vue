<template>
  <v-container class="content">
    <page-builder v-if="data" :blocks="data.content" />
  </v-container>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const route = useRoute();
const { setHeroText } = useHero();

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
const { data } = await useSanityQuery<SanityDocument>(PAGE_QUERY);
setHeroText(data.value?.title);

useSeoMeta({
  title: () => `${data.value?.title} | Juno Midwives` || "Juno Midwives",
});
</script>
