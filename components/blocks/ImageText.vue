<template>
  <v-container>
    <div :id="anchor" style="transform: translateY(-120px)"></div>
    <v-row>
      <v-col
        class="d-flex flex-column align-center"
        :class="{ 'offset-md-4': !body }"
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

      <v-col
        v-if="body"
        :order-md="orientation === 'imageLeft' ? 2 : 1"
        :class="orientation === 'imageLeft' ? 'pl-md-8' : 'pr-md-8'"
      >
        <SanityContent :blocks="body" :serializers="serializers" />
      </v-col>
    </v-row>

    <v-row v-if="link">
      <v-col cols="12" class="text-center">
        <v-btn
          :to="link.url || link.internalLink.slug.current"
          color="secondary"
          rounded="xl"
          class="px-10"
          size="large"
        >
          {{ link.text || link.internalLink.title }}
        </v-btn>
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
  link: {
    type: Object as () => any,
    default: undefined,
  },
  anchor: {
    type: String,
    default: "",
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

.content h3 {
  font-size: 1.8rem;
}
</style>
