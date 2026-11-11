<template>
  <v-container v-if="src">
    <v-row>
      <v-col cols="12" v-bind="columns">
        <!-- With a mobile image, each version only shows at its own screen size. -->
        <v-img
          :src="src"
          :class="{ 'd-none d-md-flex': mobileSrc }"
          :cover="crop"
          width="100%"
          :max-height="size === 'small' ? 400 : undefined"
          :aspect-ratio="crop ? 1 : undefined"
          rounded="xl"
          :alt="altText"
        />
        <v-img
          v-if="mobileSrc"
          :src="mobileSrc"
          class="d-md-none"
          width="100%"
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
  mobileImage: {
    type: Object as () => any,
    default: undefined,
  },
  size: {
    type: String as () => "small" | "medium" | "large",
    default: "small",
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

// Desktop column width for each size. Phones always use the full width.
const columns = computed(() => {
  switch (props.size) {
    case "large":
      return { md: 12 };
    case "medium":
      return { md: 8, "offset-md": 2 };
    default:
      return { md: 4, "offset-md": 4 };
  }
});

// Only Small images can be cropped to a square. Medium and Large always show
// the whole image.
const crop = computed(
  () => props.size === "small" && props.objectFit === "cover",
);

const { $urlFor } = useNuxtApp();
const src = computed(() => $urlFor(props.image).url());
const mobileSrc = computed(() =>
  props.mobileImage?.asset ? $urlFor(props.mobileImage).url() : undefined,
);
</script>

<style>
.text-caption.line-height-1 {
  line-height: 1.1rem !important;
}
</style>
