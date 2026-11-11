<template>
  <div :class="{ 'quote-band': band }">
    <v-container>
      <v-row>
        <v-col>
          <div v-if="band" class="quote-band__inner">
            <span class="quote-band__mark" aria-hidden="true">“</span>
            <div class="quote-band__body">
              <PortableText :value="body" :components="components" />
            </div>
          </div>
          <PortableText v-else :value="body" :components="components" />
        </v-col>
      </v-row>
    </v-container>
  </div>
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

const props = defineProps({
  body: {
    type: Array as () => PortableTextBlock[],
    required: true,
  },
  background: {
    type: String as () => "none" | "deep" | "brand",
    default: "none",
  },
});

// "deep" = dark teal quote band. "brand" was the earlier light blue option and
// is treated the same, so any leftover content still gets a band.
const band = computed(
  () => props.background === "deep" || props.background === "brand",
);

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
    ...largeTextPortableTextBlocks,
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
