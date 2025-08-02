<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <client-only>
          <PDFViewer :pdf="data?.pdf?.asset?.url" />
        </client-only>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const { setHeroText } = useHero();
setHeroText("Privacy Policy");

useSeoMeta({
  title: "Privacy Policy | Juno Midwives",
});

const PAGE_QUERY = groq`*[_type == "pdfPage" && slug.current == 'privacy-policy'][0]{
  ...,
  pdf{
    ...,
    asset->
  }
}`;
const { data } = await useSanityQuery<SanityDocument>(PAGE_QUERY);
</script>
