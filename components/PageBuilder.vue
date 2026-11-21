<template>
  <template v-for="(block, index) in blocks" :key="block._id">
    <component
      :is="components[block._type]"
      v-bind="block"
      class="page-block"
      :class="spacingClass(index)"
    />
    <v-divider
      v-if="false && index + 1 < (blocks?.length || 0)"
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
import Table from "./blocks/Table.vue";
import CTA from "./blocks/CTA.vue";
import Image from "./blocks/Image.vue";
import Recommendation from "./blocks/Recommendation.vue";
import Calendly from "./blocks/Calendly.vue";
import VideoEmbed from "./blocks/VideoEmbed.vue";
import RecentPosts from "./blocks/RecentPosts.vue";
import TravelRadiusMap from "./blocks/TravelRadiusMap.vue";
import NewsletterSignup from "./blocks/NewsletterSignup.vue";
import Comparison from "./blocks/Comparison.vue";
import Steps from "./blocks/Steps.vue";

const props = defineProps({
  blocks: {
    type: Array as () => any[],
  },
});

// Blocks that read as the content of a heading-led text block just before
// them ("How it works" and its steps), so they sit close to it.
const FOLLOWS_HEADING = new Set([
  "steps",
  "comparison",
  "table",
  "faq",
  "calendly",
  "videoEmbed",
  "centeredImage",
]);

const isHeadingText = (block: any) =>
  block?._type === "blockContent" &&
  !["deep", "brand"].includes(block.background) &&
  /^h[1-4]$/.test(block.body?.[0]?.style ?? "");

// Spacing (settings.scss): a section gap by default, less for a button under
// its section or a block that belongs to the heading above it.
function spacingClass(index: number) {
  const block = props.blocks?.[index];
  const prev = props.blocks?.[index - 1];
  if (!prev) return undefined;
  if (block._type === "cta") return "page-block--cta";
  if (FOLLOWS_HEADING.has(block._type) && isHeadingText(prev)) return "page-block--joined";
  return undefined;
}

const components: Record<string, Component> = {
  faq: FAQ,
  logoGroup: LogoGroup,
  imageText: ImageText,
  blockContent: BlockContent,
  table: Table,
  cta: CTA,
  centeredImage: Image,
  recommendation: Recommendation,
  calendly: Calendly,
  videoEmbed: VideoEmbed,
  recentPosts: RecentPosts,
  travelRadiusMap: TravelRadiusMap,
  newsletterSignup: NewsletterSignup,
  comparison: Comparison,
  steps: Steps,
};
</script>
