<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn
          nuxt
          :to="url"
          color="secondary"
          rounded="xl"
          class="px-10"
          size="large"
        >
          {{ text }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps({
  link: {
    type: Object,
    required: true,
  },
});

const url = computed(() => {
  if (props.link.type === "internal") {
    let url = props.link.internalLink.slug.current;
    if (props.link.anchor) to += `#${link.anchor}`;
    return url;
  }
  return props.link.url;
});

const text = computed(() => props.link.text || props.link.internalLink.title);
</script>
