<template>
  <CalendlyInlineWidget v-bind="{ url }" />
</template>

<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
});
</script>
