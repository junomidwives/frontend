<template>
  <client-only>
    <v-img
      v-if="showHero"
      src="/img/splash.jpg"
      cover
      :max-height="400"
      class="hero-image"
    >
      <v-sheet
        width="100%"
        height="100%"
        color="transparent"
        class="d-flex align-end pa-4 pa-md-16 text-h5 text-sm-h3 text-md-h2 text-white"
      >
        <div v-if="heroText && heroText !== 'Home'">
          <p class="font-weight-bold">{{ heroText }}</p>
        </div>
        <div v-else>
          <p class="font-weight-bold">Natasha & Sophie</p>
          <p class="font-weight-thin">
            Independent midwives<br />
            in Kent
          </p>
        </div>
      </v-sheet>
    </v-img>
  </client-only>
</template>

<script setup lang="ts">
const { heroText, showHero } = useHero();
</script>
