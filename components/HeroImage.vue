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
        class="text-h5 text-sm-h3 text-md-h2 text-white"
      >
        <v-container fluid class="h-100 ps-4 ps-md-12 pb-0">
          <v-row class="h-100">
            <v-col
              v-if="heroText && heroText !== 'Home'"
              class="d-flex flex-column justify-end pb-0 pb-md-4"
              cols="12"
              md="10"
            >
              <p class="font-weight-bold">{{ heroText }}</p>
            </v-col>

            <v-col v-else class="d-flex flex-column justify-end pb-0 pb-md-4">
              <p class="font-weight-bold">Natasha & Sophie</p>
              <p class="font-weight-thin">
                Independent Midwives<br />
                in Kent
              </p>
            </v-col>
          </v-row>
        </v-container>
        <!-- <div v-if="heroText && heroText !== 'Home'">
          <p class="font-weight-bold">{{ heroText }}</p>
        </div>
        <div v-else>
          <p class="font-weight-bold">Natasha & Sophie</p>
          <p class="font-weight-thin">
            Independent midwives<br />
            in Kent
          </p>
        </div> -->
      </v-sheet>
    </v-img>
  </client-only>
</template>

<script setup lang="ts">
const { heroText, showHero } = useHero();
</script>
