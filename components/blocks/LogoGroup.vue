<template>
  <section v-if="logos.length" class="logos" :aria-label="title || 'Memberships and training'">
    <h2 v-if="title" class="logos__title">{{ title }}</h2>
    <div class="logos__row">
      <component
        :is="logo.url ? 'a' : 'span'"
        v-for="logo in logos"
        :key="logo._key"
        :href="logo.url || undefined"
        :target="logo.url ? '_blank' : undefined"
        :rel="logo.url ? 'noopener' : undefined"
        class="logos__item"
      >
        <img
          :src="($urlFor as any)(logo.image).height(120).auto('format').url()"
          :alt="logo.alt || ''"
          class="logos__img"
          loading="lazy"
          decoding="async"
        />
      </component>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "",
  },
  logos: {
    type: Array as () => any[],
    default: () => [],
  },
});

const { $urlFor } = useNuxtApp();
</script>

<style>
.logos {
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: 8px;
}

.content .logos__title,
.logos__title {
  margin: 0 0 24px;
}

/* One even row of greyscale logos (colour on hover), wrapping on narrow
   screens. The old 240px-wide image boxes overflowed phones. */
.logos__row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 24px 40px;
  padding-top: 32px;
  border-top: 1px solid rgb(var(--v-theme-line));
}

.logos__item {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* A fixed height (width follows the logo's shape): SVG logos without their
   own width/height collapse to nothing with height: auto. */
.logos__img {
  display: block;
  height: 48px;
  width: auto;
  max-width: 160px;
  object-fit: contain;
  filter: grayscale(1);
  opacity: 0.75;
  transition: filter 0.2s, opacity 0.2s;
}

a.logos__item:hover .logos__img,
a.logos__item:focus-visible .logos__img {
  filter: none;
  opacity: 1;
}

@media (max-width: 700px) {
  .logos__row {
    justify-content: center;
    gap: 24px 32px;
  }

  .logos__img {
    height: 40px;
    max-width: 120px;
  }
}
</style>
