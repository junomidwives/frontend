<template>
  <v-container>
    <v-row v-if="title">
      <v-col>
        <h2 class="text-h4 font-weight-bold">{{ title }}</h2>
      </v-col>
    </v-row>

    <v-container>
      <v-row justify="center">
        <v-col
          cols="6"
          :md="mdColWidth"
          v-for="logo in logos"
          class="d-flex justify-center"
        >
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
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  logos: {
    type: Array as () => any[],
    default: () => [],
  },
});

const mdColWidth = computed(() => {
  const n = props.logos.length;
  for (const perRow of [3, 4, 2, 6]) {
    if (n % perRow === 0) return 12 / perRow;
  }
  return 4;
});
</script>
