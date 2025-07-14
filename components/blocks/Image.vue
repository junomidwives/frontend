<template>
  <v-container v-if="src">
    <v-row>
      <v-col cols="12" md="4" offset-md="4">
        <v-img
          :src="src"
          :cover="cover"
          width="100%"
          max-height="400"
          :aspect-ratio="cover ? 1 : undefined"
          rounded="xl"
          :alt="altText"
        />
        <p class="text-caption text-center line-height-1 mt-2">{{ caption }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps({
  image: {
    type: Object as () => any,
    required: true,
  },
  objectFit: {
    type: String,
    default: "cover",
  },
  altText: {
    type: String,
    default: "",
  },
  caption: {
    type: String,
    default: "",
  },
});

const cover = computed(() => {
  return props.objectFit === "cover";
});

const { $urlFor } = useNuxtApp();
const src = computed(() => $urlFor(props.image).url());
</script>

<style>
.text-caption.line-height-1 {
  line-height: 1.1rem !important;
}
</style>
