<template>
  <v-container max-width="800" class="mt-10">
    <ContentRenderer class="text-body-1" v-if="data" :value="data" />
  </v-container>
</template>

<script setup>
const { data } = await useAsyncData(() =>
  queryCollection("content").path("/").first()
);

useSeoMeta({
  title: data.value?.title,
  description: data.value?.description,
});
</script>

<style scoped>
.text-body-1 {
  line-height: 1.8rem !important;
}
</style>
