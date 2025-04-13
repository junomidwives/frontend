<template>
  <div v-for="page in pages" :key="page" class="d-flex justify-center">
    <VuePDF :pdf="pdf" :page="page" scale="1.5" />
  </div>
</template>

<script setup>
import { VuePDF, usePDF } from "@tato30/vue-pdf";

const props = defineProps({
  pdf: String,
});

const { pdf, pages } = usePDF(props.pdf);
</script>
