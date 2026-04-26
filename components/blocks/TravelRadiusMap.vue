<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="py-8" style="height: 600px">
        <div
          ref="mapContainer"
          class="rounded-lg"
          style="width: 100%; height: 400px"
        ></div>
      </v-col>
      <v-col>
        <h2 v-if="title" class="text-h4 font-weight-bold mb-4">{{ title }}</h2>
        <SanityContent :blocks="body" :serializers="serializers" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import type { PortableTextBlock } from "@portabletext/types";

const props = defineProps<{
  title?: string;
  center: { lat: number; lng: number };
  radius: number;
  body?: PortableTextBlock[];
}>();

const mapContainer = ref<HTMLElement | null>(null);
const config = useRuntimeConfig();

const { $renderLink } = useNuxtApp();
const serializers = {
  types: {
    link: $renderLink,
  },
};

onMounted(async () => {
  setOptions({
    key: config.public.GOOGLE_MAPS_API_KEY as string,
  });

  const { Map, Circle } = await importLibrary("maps");

  const center = { lat: props.center.lat, lng: props.center.lng };
  const radiusMeters = props.radius * 1000;

  const map = new Map(mapContainer.value!, {
    center,
    zoom: 8,
    mapTypeId: "roadmap",
    disableDefaultUI: false,
  });

  new Circle({
    map,
    center,
    radius: radiusMeters,
    strokeColor: "#6750A4",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#6750A4",
    fillOpacity: 0.15,
  });
});
</script>
