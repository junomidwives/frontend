<template>
  <div v-if="target" class="block-cta">
    <nuxt-link v-if="target.to" :to="target.to" class="btn btn--primary">
      {{ label }}
    </nuxt-link>
    <a v-else :href="target.href" class="btn btn--primary">{{ label }}</a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  link: {
    type: Object,
    default: null,
  },
  file: {
    type: Object,
    default: null,
  },
});

const label = computed(() =>
  props.file
    ? props.file.description
    : props.link?.text || props.link?.internalLink?.title,
);

function getPrefix(pageType: string) {
  switch (pageType) {
    case "blog":
      return "/blog/";
    case "birthStory":
      return "/birth-stories/";
    default:
      return "/";
  }
}

// Internal pages use client-side navigation; external links and files don't.
const target = computed<{ to?: string; href?: string } | null>(() => {
  if (props.file) return { href: props.file.asset?.url };
  if (!props.link) return null;
  if (props.link.type === "internal") {
    const slug = props.link.internalLink?.slug?.current;
    if (!slug) return null;
    let to = `${getPrefix(props.link.internalLink?._type)}${slug}`;
    if (props.link.anchor) to += `#${props.link.anchor}`;
    return { to };
  }
  return props.link.url ? { href: props.link.url } : null;
});
</script>
