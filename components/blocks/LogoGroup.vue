<template>
  <v-container>
    <v-row v-if="title">
      <v-col>
        <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
      </v-col>
    </v-row>

    <v-container :max-width="xs ? '100%' : '50%'">
      <v-row>
        <v-col cols="6" v-for="logo in logos">
          <v-img :src="$urlFor(logo.image).url()" height="100" width="240" />
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
