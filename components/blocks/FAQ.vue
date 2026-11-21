<template>
  <div class="faq" :class="{ 'faq--centered': centered }">
    <div class="faq__inner">
      <h2 class="faq__title">{{ title }}</h2>
      <SanityContent :blocks="body" :serializers="serializers" />
    </div>
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

<style>
.faq {
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: 8px;
}

/* A comfortable reading width, like plain text blocks. */
.faq__inner {
  max-width: 760px;
}

.faq--centered .faq__inner {
  margin-inline: auto;
  text-align: center;
}

.content .faq__title,
.faq__title {
  margin: 0 0 12px;
  font-size: var(--type-title);
  line-height: 1.3;
}

.faq__inner > :last-child {
  margin-bottom: 0;
}
</style>
