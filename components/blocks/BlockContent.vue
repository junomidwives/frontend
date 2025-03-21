<template>
  <v-container>
    <SanityContent :blocks="body" :serializers="serializers" />
  </v-container>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import type { PortableTextBlock } from "@portabletext/types";
import { VImg } from "vuetify/components";

defineProps({
  body: {
    type: Array as () => PortableTextBlock[],
    required: true,
  },
});

const { $urlFor } = useNuxtApp();

const serializers = {
  types: {
    link: NuxtLink,
    image: ({ asset }: { asset: any }) => {
      return h(VImg, {
        src: $urlFor(asset).url(),
        cover: true,
        width: "300",
        maxHeight: "300",
        aspectRatio: "1",
        rounded: "xl",
        class: "mx-auto my-8",
      });
    },
  },
};
</script>

<style>
P {
  margin-bottom: 1rem;
}
</style>
