<template>
  <template v-for="(block, index) in blocks" :key="block._id">
    <component :is="components[block._type]" v-bind="block" class="my-8" />
    <v-divider
      v-if="index + 1 < (blocks?.length || 0)"
      length="200"
      class="mx-auto"
      thickness="2"
    />
  </template>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import FAQ from "./blocks/FAQ.vue";
import LogoGroup from "./blocks/LogoGroup.vue";
import ImageText from "./blocks/ImageText.vue";
import BlockContent from "./blocks/BlockContent.vue";

defineProps({
  blocks: {
    type: Array as () => any[],
  },
});

const components: Record<string, Component> = {
  faq: FAQ,
  logoGroup: LogoGroup,
  imageText: ImageText,
  blockContent: BlockContent,
};
</script>
