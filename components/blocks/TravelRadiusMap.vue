<template>
  <section class="map-block">
    <div class="map-block__inner" :class="{ 'map-block__inner--map-right': orientation === 'mapRight' }">
      <div
        ref="mapContainer"
        class="map-block__map"
        role="img"
        :aria-label="`Map showing a ${radius} km travel radius`"
      ></div>
      <div v-if="title || body?.length" class="map-block__body">
        <h2 v-if="title" class="map-block__title">{{ title }}</h2>
        <SanityContent v-if="body?.length" :blocks="body" :serializers="serializers" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import type { PortableTextBlock } from "@portabletext/types";

const props = defineProps<{
  title?: string;
  center: { lat: number; lng: number };
  radius: number;
  body?: PortableTextBlock[];
  orientation?: "mapLeft" | "mapRight";
}>();

const mapContainer = ref<HTMLElement | null>(null);
const config = useRuntimeConfig();

const { $renderLink } = useNuxtApp();
const serializers = {
  types: {
    link: $renderLink,
  },
};

async function loadMap() {
  setOptions({
    key: config.public.GOOGLE_MAPS_API_KEY as string,
  });

  const { Map, Circle } = await importLibrary("maps");

  const center = { lat: props.center.lat, lng: props.center.lng };

  const map = new Map(mapContainer.value!, {
    center,
    zoom: 8,
    mapTypeId: "roadmap",
    disableDefaultUI: false,
  });

  new Circle({
    map,
    center,
    radius: props.radius * 1000,
    // Juno primary (logo teal). Google Maps needs a literal colour, not a CSS variable.
    strokeColor: "#356273",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#356273",
    fillOpacity: 0.15,
  });
}

// Google Maps is ~290KB of script, and the map sits near the bottom of the
// page: only load it when the map comes within a screen of view.
let observer: IntersectionObserver | undefined;

onMounted(() => {
  if (!mapContainer.value) return;
  if (!("IntersectionObserver" in window)) {
    loadMap();
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer?.disconnect();
        loadMap();
      }
    },
    { rootMargin: "100% 0px" },
  );
  observer.observe(mapContainer.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<style>
.map-block {
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: 8px;
}

.map-block__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 28px 64px;
}

.map-block__inner--map-right {
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.map-block__map {
  flex: 1 1 440px;
  min-height: 360px;
  border-radius: 20px;
  overflow: hidden;
  /* Shown until the map loads. */
  background: rgb(var(--v-theme-tint));
}

.map-block__body {
  flex: 1 1 320px;
  min-width: 0;
}

.content .map-block__title,
.map-block__title {
  margin: 0 0 16px;
}

.map-block__body > :last-child {
  margin-bottom: 0;
}

/* Tablets and up: map and text side by side, like the image-text sections. */
@media (min-width: 701px) {
  .map-block__inner {
    flex-wrap: nowrap;
  }
  .map-block__inner > * {
    min-width: 0;
  }
}

@media (min-width: 701px) and (max-width: 960px) {
  .map-block__inner {
    gap: 32px;
  }
}

@media (max-width: 700px) {
  .map-block__map {
    flex-basis: 100%;
    min-height: 280px;
  }
}
</style>
