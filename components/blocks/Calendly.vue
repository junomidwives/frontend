<template>
  <div
    class="calendly-inline-widget"
    :data-url="url"
    style="min-width: 320px; height: 700px"
  ></div>
</template>

<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true,
  },
});

const calendly = useCalendly();

onMounted(() => {
  calendly.initInlineWidget();
});
</script>
