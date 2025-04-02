<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn
          :to="url || internalLink.slug.current"
          color="secondary"
          rounded="xl"
          class="px-10"
          size="large"
        >
          {{ text || internalLink.title }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
defineProps({
  url: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  internalLink: {
    type: Object as () => { title: string; slug: { current: string } },
    default: undefined,
  },
});
</script>
