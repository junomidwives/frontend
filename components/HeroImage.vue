<template>
  <section class="hero" :class="{ 'hero--home': isHome }">
    <img
      src="/img/splash.jpg"
      alt=""
      class="hero__image"
      width="1880"
      height="1253"
      fetchpriority="high"
    />
    <div class="hero__inner">
      <template v-if="isHome">
        <p class="hero__title">Natasha &amp; Sophie</p>
        <p class="hero__subtitle">Independent Midwives in Kent</p>
      </template>
      <p v-else class="hero__title">{{ text }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
// Each page renders its own hero, so the text is right in the
// server-rendered HTML even when it comes from Sanity.
const props = defineProps<{
  /** The page title. Leave it out on the homepage to show the names. */
  text?: string;
}>();

const isHome = computed(() => !props.text);
</script>

<style>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 320px;
  overflow: hidden;
  background: rgb(var(--v-theme-deep));
  color: #fff;
}

.hero--home {
  min-height: 400px;
}

.hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  filter: brightness(0.95);
}

/* Shade only behind the text, so the right of the photo stays bright. */
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(23, 49, 61, 0.72) 0%,
    rgba(23, 49, 61, 0.45) 38%,
    rgba(23, 49, 61, 0) 68%
  );
}

.hero__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 64px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero--home .hero__inner {
  padding-block: 64px;
}

.hero__title,
.hero__subtitle {
  margin: 0;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.18);
}

.hero__title {
  font-size: var(--type-display);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.hero__subtitle {
  font-size: var(--type-display-sub);
  line-height: 1.15;
  font-weight: 300;
  color: rgb(var(--v-theme-tint));
}

/* Tablets */
@media (max-width: 960px) {
  .hero {
    min-height: 240px;
  }
  .hero--home {
    min-height: 340px;
  }
  .hero__inner,
  .hero--home .hero__inner {
    padding-block: 56px;
  }
}

/* Phones */
@media (max-width: 700px) {
  .hero {
    min-height: 180px;
  }
  .hero--home {
    min-height: 240px;
  }
  .hero__inner,
  .hero--home .hero__inner {
    padding-block: 40px;
    gap: 4px;
  }
}
</style>
