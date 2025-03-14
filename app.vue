<template>
  <v-app ref="app">
    <app-bar />

    <v-main>
      <v-img src="/img/download.jpg" cover max-height="500" class="hero-image">
        <v-sheet
          width="100%"
          height="100%"
          color="transparent"
          class="d-flex align-end pa-4 pa-md-16"
        >
          <div class="text-h5 text-sm-h3 text-md-h2 text-white">
            <p class="font-weight-bold">Natasha & Sophie</p>
            <p class="font-weight-thin">
              Independant midwives<br />
              in Kent
            </p>
          </div>
        </v-sheet>
      </v-img>
    </v-main>

    <app-footer />
  </v-app>
</template>
