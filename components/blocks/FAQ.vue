<template>
  <div :class="centered ? 'text-center' : ''">
    <h1 class="text-h5 font-weight-bold mb-4">{{ title }}</h1>
    <SanityContent :blocks="body" :serializers="serializers" />
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import type { PortableTextBlock } from "@portabletext/types";

defineProps({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: Array as () => PortableTextBlock[],
    required: true,
  },
  centered: {
    type: Boolean,
    required: true,
  },
});

const serializers = {
  types: {
    link: NuxtLink,
  },
};
</script>
