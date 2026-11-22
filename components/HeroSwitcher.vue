<template>
  <!-- EXPLORATION ONLY: a dev-server panel for comparing hero styles.
       Remove with the ?hero / ?texture switches in HeroImage.vue. -->
  <aside v-if="open" class="hero-switcher" aria-label="Hero style (dev only)">
    <div class="hero-switcher__head">
      <strong>Hero style</strong>
      <button type="button" class="hero-switcher__close" aria-label="Hide panel" @click="open = false">×</button>
    </div>
    <div class="hero-switcher__group">
      <span class="hero-switcher__label">Height</span>
      <div class="hero-switcher__options">
        <button
          v-for="h in HEIGHTS"
          :key="h"
          type="button"
          class="hero-switcher__option"
          :aria-pressed="(route.query.height ?? '100') === h"
          @click="setHeight(h)"
        >
          {{ h }}%
        </button>
      </div>
    </div>
    <div v-for="group in GROUPS" :key="group.label" class="hero-switcher__group">
      <span class="hero-switcher__label">{{ group.label }}</span>
      <div class="hero-switcher__options">
        <button
          v-for="option in group.options"
          :key="option.label"
          type="button"
          class="hero-switcher__option"
          :aria-pressed="isActive(option.query)"
          @click="choose(option.query)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
  </aside>
  <button v-else type="button" class="hero-switcher__reopen" @click="open = true">Hero style</button>
</template>

<script setup lang="ts">
type Query = { hero?: string; texture?: string; opacity?: string };

const GROUPS: { label: string; options: { label: string; query: Query }[] }[] = [
  {
    label: "Current",
    options: [
      { label: "Photo", query: {} },
      { label: "Solid", query: { hero: "solid" } },
    ],
  },
  {
    label: "Photo on teal (opacity)",
    options: ["15", "25", "35"].map((o) => ({
      label: `${o}%`,
      query: { hero: "tint", opacity: o },
    })),
  },
  {
    label: "Ideas",
    options: [
      { label: "Horizon", query: { hero: "horizon" } },
      { label: "Logo mark", query: { hero: "mark" } },
      { label: "Pebbles", query: { hero: "pebbles" } },
    ],
  },
  {
    label: "Textures",
    options: [
      { label: "Waves", query: { hero: "texture", texture: "waves" } },
      { label: "Glow", query: { hero: "texture", texture: "glow" } },
    ],
  },
  {
    label: "Gradients",
    options: [
      { label: "Depth", query: { hero: "texture", texture: "depth" } },
      { label: "Spotlight", query: { hero: "texture", texture: "spotlight" } },
      { label: "Mesh", query: { hero: "texture", texture: "mesh" } },
    ],
  },
];

const HEIGHTS = ["100", "80", "65"];

const route = useRoute();
const router = useRouter();
const open = ref(true);

// Matches HeroImage.vue's defaults: no ?hero means the photo, no ?texture
// means waves and no ?opacity means 25%.
function isActive(query: Query) {
  const hero = (route.query.hero as string | undefined) ?? "";
  if (!query.hero) return hero === "";
  if (hero !== query.hero) return false;
  if (query.hero === "tint") return (route.query.opacity ?? "25") === query.opacity;
  if (query.hero === "texture") return (route.query.texture ?? "waves") === query.texture;
  return true;
}

// Keeps the chosen height when switching style, and vice versa.
function choose(query: Query) {
  const { hero, texture, opacity, ...rest } = route.query;
  router.replace({ query: { ...rest, ...query } });
}

function setHeight(h: string) {
  const { height, ...rest } = route.query;
  router.replace({ query: h === "100" ? rest : { ...rest, height: h } });
}
</script>

<style>
.hero-switcher,
.hero-switcher__reopen {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 3000;
  font-size: 13px;
  line-height: 1.3;
  color: #1f2e35;
  background: #fff;
  border: 1px solid #d9e3e2;
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(31, 46, 53, 0.18);
}

.hero-switcher {
  width: 264px;
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero-switcher__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-switcher__close {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 18px;
  line-height: 1;
  color: #5e7178;
}

.hero-switcher__close:hover {
  background: #eef4f3;
}

.hero-switcher__group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hero-switcher__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #5e7178;
}

.hero-switcher__options {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.hero-switcher__option {
  padding: 6px 10px;
  border: 1px solid #d9e3e2;
  border-radius: 999px;
  color: #1f2e35;
}

.hero-switcher__option:hover {
  border-color: #356273;
}

.hero-switcher__option[aria-pressed="true"] {
  background: #356273;
  border-color: #356273;
  color: #fff;
}

.hero-switcher__reopen {
  padding: 8px 14px;
  font-weight: 700;
}
</style>
