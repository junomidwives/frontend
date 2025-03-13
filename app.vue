<template>
  <v-app>
    <v-layout>
      <app-bar />

      <v-main>
        <v-img
          src="/img/download.jpg"
          width="100%"
          max-height="480"
          cover
          class="hero-image"
        >
        </v-img>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
.hero-image {
  filter: brightness(0.75);
}
</style>
