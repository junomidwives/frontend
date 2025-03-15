<template>
  <ContentRenderer :value="post" />
</template>

<script setup>
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(() => {
  return queryCollection("blog").path(`/blog/${slug}`).first();
});
</script>
