<template>
  <hero-image />
</template>

<script setup lang="ts">
const { data } = await useAsyncData(() =>
  queryCollection("content").path("/").first()
);

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
});
</script>
