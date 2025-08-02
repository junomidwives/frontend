<template>
  <canvas ref="canvasRef" style="border: 1px solid #ccc"></canvas>
  <v-pagination
    v-model="pageNo"
    :length="totalPages"
    density="compact"
    size="small"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  pdf: {
    type: String,
    required: true,
  },
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const pageNo = ref<number>(1);
const pdfjsLib = ref<any>(null);
let pdf: any = null;
const totalPages = ref(0);

const loadPDF = async () => {
  if (!props.pdf) return;

  const pdfjs = await import("pdfjs-dist");
  const pdfjsWorkerImport = await import("pdfjs-dist/build/pdf.worker?url");
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerImport.default;
  pdfjsLib.value = pdfjs;

  const loadingTask = pdfjsLib.value.getDocument(props.pdf);
  pdf = await loadingTask.promise;
  totalPages.value = pdf.numPages;
  await renderPage(pageNo.value);
};

async function renderPage(pageNum: number) {
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = canvasRef.value;
  const context = canvas?.getContext("2d");

  if (!canvas || !context) return;

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  await page.render({ canvasContext: context, canvas, viewport }).promise;
}

onMounted(async () => {
  loadPDF();
});

watch(props, () => {
  renderPage(pageNo.value);
});

watch(pageNo, (newPage) => {
  renderPage(newPage);
});
</script>
