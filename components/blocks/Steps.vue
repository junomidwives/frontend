<template>
  <v-container v-if="steps?.length">
    <ol class="steps" :style="{ '--steps-count': Math.min(steps.length, 4) }">
      <li v-for="(step, i) in steps" :key="step._key" class="steps__item">
        <div class="steps__marker" aria-hidden="true">
          <span class="steps__circle">
            <v-icon :icon="iconFor(step.icon)" color="white" />
          </span>
          <span class="steps__number">{{ i + 1 }}</span>
        </div>
        <div class="steps__card">
          <h3 class="steps__title">{{ step.title }}</h3>
          <p v-if="step.text" class="steps__text">{{ step.text }}</p>
        </div>
      </li>
    </ol>
  </v-container>
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
/* Colours from the client's original "How it works" graphic. */
.steps {
  --steps-deep: #22495a;
  --steps-mint: #c1e3d3;
  --steps-blush: #f7b9b9;
  --steps-circle: 5.5rem;
  list-style: none;
  margin: 0 auto;
  padding: 0;
  max-width: 1100px;
  display: grid;
  grid-template-columns: repeat(var(--steps-count), minmax(0, 1fr));
  gap: 2rem 1.5rem;
  color: var(--steps-deep);
}

/* Undo the global `li` styles used for rich-text lists. */
.steps .steps__item {
  margin: 0;
  padding: 0;
  line-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.steps__marker {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Dotted connector to the next step, behind the circles. */
.steps__item:not(:last-child) .steps__marker::after {
  content: "";
  position: absolute;
  top: 50%;
  left: calc(50% + var(--steps-circle) / 2 + 0.75rem);
  width: calc(100% - var(--steps-circle) + 1.5rem - 1.5rem);
  border-top: 4px dashed var(--steps-mint);
}

/* No connector at the end of a row when steps wrap onto a second row. */
.steps__item:nth-child(4n) .steps__marker::after {
  display: none;
}

.steps__circle {
  width: var(--steps-circle);
  height: var(--steps-circle);
  border-radius: 50%;
  background: var(--steps-deep);
  display: grid;
  place-items: center;
}

.steps__circle .v-icon {
  font-size: 2.4rem;
}

.steps__number {
  position: absolute;
  top: -0.25rem;
  left: calc(50% + var(--steps-circle) / 2 - 1.4rem);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--steps-blush);
  color: var(--steps-deep);
  font-weight: 700;
  display: grid;
  place-items: center;
  font-size: 1rem;
}

.steps__card {
  background: var(--steps-mint);
  border-radius: 20px;
  padding: 1.75rem 1.25rem;
  text-align: center;
  width: 100%;
  flex: 1;
}

.content .steps__title,
.steps__title {
  font-size: 1.3rem;
  line-height: 1.25;
  font-weight: 700;
  margin: 0 0 0.6rem;
  text-wrap: balance;
}

.content .steps__text,
.steps__text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5 !important;
}

/* Tablets: two per row. */
@media (max-width: 1023px) {
  .steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .steps__item:nth-child(2n) .steps__marker::after {
    display: none;
  }
}

/* Phones: a vertical list, circle on the left, card on the right. */
@media (max-width: 599px) {
  .steps {
    --steps-circle: 4rem;
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
  }

  .steps .steps__item {
    flex-direction: row;
    align-items: stretch;
    gap: 1rem;
  }

  .steps__marker {
    width: auto;
    flex: none;
    align-items: center;
  }

  .steps__item:not(:last-child) .steps__marker::after {
    display: block;
    top: calc(50% + var(--steps-circle) / 2 + 0.35rem);
    left: 50%;
    width: 0;
    height: calc(50% - var(--steps-circle) / 2 + 0.6rem);
    border-top: 0;
    border-left: 3px dashed var(--steps-mint);
  }

  .steps__circle .v-icon {
    font-size: 1.8rem;
  }

  .steps__number {
    top: calc(50% - var(--steps-circle) / 2 - 0.5rem);
    left: auto;
    right: -0.6rem;
    width: 1.6rem;
    height: 1.6rem;
    font-size: 0.85rem;
  }

  .steps__card {
    text-align: left;
    padding: 1rem 1.25rem;
  }

  .content .steps__title,
  .steps__title {
    font-size: 1.15rem;
    margin-bottom: 0.25rem;
  }
}
</style>
