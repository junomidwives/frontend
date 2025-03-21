<template>
  <v-container>
    <v-row>
      <v-col
        class="d-flex flex-column align-center"
        cols="12"
        md="4"
        :order-md="orientation === 'imageLeft' ? 1 : 2"
      >
        <v-img
          :src="$urlFor(image.image).url()"
          cover
          width="100%"
          max-height="400"
          aspect-ratio="1"
          rounded="xl"
        />
        <p class="text-body-1 mt-2">{{ image.caption }}</p>
      </v-col>
      <v-col :order-md="orientation === 'imageLeft' ? 2 : 1">
        <SanityContent :blocks="body" :serializers="serializers" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import type { PortableTextBlock } from "@portabletext/types";

defineProps({
  image: {
    type: Object as () => any,
    required: true,
  },
  body: {
    type: Array as () => PortableTextBlock[],
    required: true,
  },
  orientation: {
    type: String,
    required: true,
  },
});

const serializers = {
  types: {
    link: NuxtLink,
  },
};
</script>

<style>
P {
  margin-bottom: 1rem;
}
</style>
