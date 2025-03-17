<template>
  <v-img src="/img/splash.jpg" cover :max-height="400" class="hero-image">
    <v-sheet
      width="100%"
      height="100%"
      color="transparent"
      class="d-flex align-end pa-4 pa-md-16 text-h5 text-sm-h3 text-md-h2 text-white"
    >
      <div v-if="page?.heroText" class="font-weight-bold">
        {{ page?.heroText }}
      </div>
      <div v-else>
        <p class="font-weight-bold">Natasha & Sophie</p>
        <p class="font-weight-thin">
          Independant midwives<br />
          in Kent
        </p>
      </div>
    </v-sheet>
  </v-img>
</template>

<script setup>
const route = useRoute();

const { data: page } = await useAsyncData(
  () => {
    return queryCollection("content").path(route.path).first();
  },
  {
    watch: [() => route.path],
  }
);
</script>
