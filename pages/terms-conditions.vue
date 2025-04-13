<template>
  <v-container>
    <client-only>
      <PDFViewer :pdf="data?.pdf?.asset?.url" />
    </client-only>
  </v-container>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const { setHeroText } = useHero();
setHeroText("Terms and Conditions");

const PAGE_QUERY = groq`*[_type == "pdfPage" && slug.current == 'terms-conditions'][0]{
  ...,
  pdf{
    ...,
    asset->
  }
}`;
const { data } = await useSanityQuery<SanityDocument>(PAGE_QUERY);
</script>
