<template>
  <ol v-if="steps?.length" class="steps">
    <li v-for="(step, i) in steps" :key="step._key" class="steps__item">
      <span class="steps__icon" aria-hidden="true">
        <v-icon :icon="iconFor(step.icon)" size="20" />
      </span>
      <div class="steps__body">
        <h3 class="steps__title">{{ i + 1 }}. {{ step.title }}</h3>
        <p v-if="step.text" class="steps__text">{{ step.text }}</p>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
type Step = { _key: string; icon?: string; title: string; text?: string };

defineProps<{ steps?: Step[] }>();

// Keep in step with STEP_ICONS in the cms repo (schemaTypes/blocks/stepsType.ts).
const ICONS: Record<string, string> = {
  chat: "mdi-message-text-outline",
  heart: "mdi-heart-outline",
  document: "mdi-file-document-outline",
  home: "mdi-home-outline",
  calendar: "mdi-calendar-heart",
  phone: "mdi-phone-outline",
  baby: "mdi-baby-face-outline",
  star: "mdi-star-outline",
};
const iconFor = (name?: string) => ICONS[name ?? ""] ?? ICONS.heart;
</script>

<style>
/* Four across from 1024px, two by two on tablets, a list on phones. */
.steps {
  list-style: none;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 8px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 32px;
}

/* Undo the global `li` styles used for rich-text lists. */
.steps .steps__item {
  margin: 0;
  padding: 24px 0 0;
  line-height: inherit;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 2px solid rgb(var(--v-theme-deep));
}

.steps__icon {
  flex: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgb(var(--v-theme-deep));
  color: #fff;
  display: grid;
  place-items: center;
}

.steps__body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.content .steps__title,
.steps__title {
  margin: 0;
  font-size: var(--type-title);
  line-height: 1.3;
  font-weight: 700;
  color: rgb(var(--v-theme-ink));
}

.content .steps__text,
.steps__text {
  margin: 0;
  font-size: var(--type-small);
  line-height: 1.6 !important;
  color: rgb(var(--v-theme-body));
}

@media (min-width: 701px) and (max-width: 1023px) {
  .steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px 40px;
  }
}

@media (max-width: 700px) {
  .steps {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }

  .steps .steps__item {
    flex-direction: row;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 0;
    border-top-width: 1px;
  }

  .steps__icon {
    width: 40px;
    height: 40px;
  }

  .steps__body {
    padding-top: 7px;
  }
}
</style>
