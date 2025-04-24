<template>
  <v-container>
    <v-row>
      <v-col>
        <SanityContent :blocks="body" :serializers="serializers" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { PortableTextBlock } from "@portabletext/types";
import { VImg } from "vuetify/components";
import CTA from "@/components/blocks/CTA.vue";
import Image from "~/components/blocks/Image.vue";

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
    cta: ({ link }: { link: any }) => h(CTA, { link }),
    pdf: (file: any) => h(CTA, { file }),
    link: $renderLink,
    imageBlock: Image,
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
