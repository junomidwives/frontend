<template>
  <div>
    <hero-image text="Privacy Policy" />
    <v-container>
      <v-row>
        <v-col class="text-center">
          <client-only>
            <PDFViewer :pdf="data?.pdf?.asset?.url" />
          </client-only>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

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
const { data } = await useSanityData<SanityDocument>(PAGE_QUERY);
</script>
