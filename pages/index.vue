<template>
  <v-container>
    <page-builder v-if="data" :blocks="data.homePage?.content" />
  </v-container>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const { setHeroText } = useHero();
setHeroText("");

const SITE_QUERY = groq`*[_id == "siteSettings"][0]{
  homePage->{
    ...,
    content[]{
      ...,
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
</script>
