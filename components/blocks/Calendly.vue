<template>
  <CalendlyInlineWidget v-bind="{ url }" style="min-height: 800px" />
</template>

<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
});
</script>
