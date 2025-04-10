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

const { $urlFor, $renderLink } = useNuxtApp();

const serializers = {
  types: {
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
    link: $renderLink,
  },
  marks: {
    center: (_: any, { slots }: any) =>
      h("div", { class: "text-center" }, slots.default?.()),
  },
};
</script>

<style>
P {
  margin-bottom: 1rem;
}

ul {
  margin-bottom: 2rem;
}

li {
  line-height: 2;
  margin-left: 2rem;
  padding-left: 1rem;
}
</style>
