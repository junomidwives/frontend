<template>
  <v-container>
    <v-row v-if="title">
      <v-col>
        <h2 class="text-h4 font-weight-bold">{{ title }}</h2>
      </v-col>
    </v-row>

    <v-container>
      <v-row>
        <v-col cols="6" md="4" lg="3" v-for="logo in logos">
          <nuxt-link :href="logo.url" target="_blank">
            <v-img
              :src="$urlFor(logo.image).url()"
              height="100"
              width="240"
              :alt="logo.alt"
            />
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
const { xs } = useDisplay();

defineProps({
  title: {
    type: String,
    default: "",
  },
  logos: {
    type: Array as () => any[],
    default: () => [],
  },
});
</script>
