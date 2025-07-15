<template>
  <v-container>
    <v-row>
      <v-col>
        <PortableText :value="body" :components="components" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { PortableTextBlock } from "@portabletext/types";
import { VImg } from "vuetify/components";
import CTA from "@/components/blocks/CTA.vue";
import Image from "~/components/blocks/Image.vue";
import {
  PortableText,
  type PortableTextVueComponents,
} from "@portabletext/vue";

defineProps({
  body: {
    type: Array as () => PortableTextBlock[],
    required: true,
  },
});

const { $urlFor, $renderLink2 } = useNuxtApp();

const components: Partial<PortableTextVueComponents> = {
  types: {
    image: (props) => {
      const asset = props.value.asset;
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
    cta: (props) => h(CTA, { link: props.value.link }),
    pdf: (file: any) => h(CTA, { file }),
    imageBlock: (props) => h(Image, { ...props.value }),
  },
  marks: {
    link: $renderLink2,
  },
  block: {
    center: (_: any, { slots }: any) => {
      return h("p", { class: "text-center" }, slots.default());
    },
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
