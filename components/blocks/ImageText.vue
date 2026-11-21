<template>
  <div class="split-block">
    <div v-if="anchor" :id="anchor" class="split-block__anchor"></div>

    <div
      class="split"
      :class="{
        'split--image-right': orientation === 'imageRight',
        'split--whole': wholeImage,
        'split--image-only': !body.length,
      }"
    >
      <figure class="split__media">
        <img
          :src="imageUrl"
          :alt="image.alt || ''"
          class="split__img"
          loading="lazy"
          decoding="async"
        />
        <figcaption v-if="image.caption">{{ image.caption }}</figcaption>
      </figure>

      <div v-if="body.length" class="split__body">
        <SanityContent :blocks="body" :serializers="serializers" />
      </div>
    </div>

    <div v-if="button" class="block-cta split-block__cta">
      <nuxt-link v-if="button.to" :to="button.to" class="btn btn--primary">
        {{ button.label }}
      </nuxt-link>
      <a v-else :href="button.href" class="btn btn--primary">{{ button.label }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PortableTextBlock } from "@portabletext/types";

const props = defineProps({
  image: {
    type: Object as () => any,
    required: true,
  },
  body: {
    type: Array as () => PortableTextBlock[],
    default: [],
  },
  orientation: {
    type: String,
    default: "imageLeft",
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

// "Show whole image" (graphics, tables): wider, never cropped.
const wholeImage = computed(() => props.image?.fit === "contain");

const { $urlFor, $renderLink } = useNuxtApp();

// A web-sized image rather than the full-size upload (often 2000-4000px).
const imageUrl = computed(() =>
  ($urlFor as any)(props.image.image)
    .width(wholeImage.value ? 1200 : 900)
    .auto("format")
    .url(),
);

const serializers = {
  types: {
    link: $renderLink,
  },
  styles: largeTextSerializerStyles,
};

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

const button = computed(() => {
  const link = props.link;
  if (link?.url) return { href: link.url, label: link.text || link.url };
  if (link?.type === "internal" && link.internalLink?.slug?.current) {
    let to = `${getPrefix(link.internalLink._type)}${link.internalLink.slug.current}`;
    if (link.anchor) to += `#${link.anchor}`;
    return { to, label: link.text || link.internalLink.title };
  }
  return null;
});
</script>

<style>
.split-block {
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: 8px;
}

/* Anchor target, offset so the sticky header doesn't cover the section. */
.split-block__anchor {
  position: relative;
  top: -100px;
}

.split {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 28px 64px;
}

.split--image-right {
  flex-direction: row-reverse;
  /* In a reversed row, flex-end is the left: keep the text on the content
     edge and any spare space beside the photo. */
  justify-content: flex-end;
}

.split--image-only {
  justify-content: center;
}

.split__media {
  flex: 1 1 320px;
  max-width: 420px;
  margin: 0;
}

.split__img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 20px;
}

.split__media figcaption {
  margin-top: 12px;
  text-align: center;
  font-size: 0.9375rem;
  color: rgb(var(--v-theme-muted));
}

.split__body {
  flex: 1 1 440px;
  max-width: 600px;
  min-width: 0;
}

.split__body > :first-child {
  margin-top: 0;
}

.split__body > :last-child {
  margin-bottom: 0;
}

.split--whole .split__media {
  flex-basis: 400px;
  max-width: 560px;
}

.split--whole .split__img {
  aspect-ratio: auto;
  object-fit: contain;
  border-radius: 12px;
}

.split-block__cta {
  margin-top: 32px;
}

/* The first block on a page (the homepage intro): a square photo. */
.page-block:first-child .split:not(.split--whole) .split__img {
  aspect-ratio: 1;
}

.page-block:first-child .split:not(.split--whole) .split__media {
  max-width: 440px;
}

/* Tablet and up: always side by side; the photo shrinks rather than the
   row wrapping (which left the photo stranded with space beside it). */
@media (min-width: 701px) {
  .split {
    flex-wrap: nowrap;
  }
  .split > * {
    min-width: 0;
  }
}

@media (min-width: 701px) and (max-width: 960px) {
  .split {
    gap: 32px;
  }
  .split:not(.split--whole) .split__media {
    flex: 0 0 40%;
    max-width: none;
  }
}

/* Phones: photo above the text, full width (centred once it hits its max). */
@media (max-width: 700px) {
  .split__media,
  .page-block:first-child .split:not(.split--whole) .split__media {
    width: 100%;
    max-width: 420px;
    margin-inline: auto;
  }

  .split--whole .split__media {
    max-width: none;
  }

  /* Intro photo: wider crop on phones, so the opening screen reaches the text. */
  .page-block:first-child .split:not(.split--whole) .split__img {
    aspect-ratio: 3 / 2;
    object-position: center 30%;
  }

  .page-block:first-child {
    margin-top: 32px;
  }
}
</style>
