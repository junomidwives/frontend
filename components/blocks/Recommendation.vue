<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <NuxtLink :to="url">
          <v-img :src="$urlFor(image).url()" width="100%" rounded />
        </NuxtLink>
      </v-col>
      <v-col class="pl-8">
        <NuxtLink :to="url" class="text-decoration-none text-surface-variant">
          <h2 class="text-h4 font-weight-bold line-height-1 mt-4">
            {{ name }}
          </h2>
        </NuxtLink>
        <h3 v-if="service" class="text-h4 line-height-1 mb-8">{{ service }}</h3>
        <SanityContent :blocks="description" />
        <p v-if="contact?.email" class="text-body-1">{{ contact.email }}</p>
        <p v-if="contact?.phone" class="text-body-1">{{ contact.phone }}</p>

        <div class="d-flex align-center ga-2">
          <nuxt-link
            v-if="socials?.facebook"
            :href="socials.facebook"
            target="_blank"
          >
            <v-icon color="blue-darken-3" icon="mdi-facebook" size="x-large" />
          </nuxt-link>

          <nuxt-link
            v-if="socials?.instagram"
            :href="socials.instagram"
            target="_blank"
          >
            <v-icon color="pink-darken-3" icon="mdi-instagram" size="x-large" />
          </nuxt-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { PortableTextBlock } from "@portabletext/types";

defineProps({
  name: {
    type: String,
    default: "",
  },
  service: {
    type: String,
    default: "",
  },
  image: {
    type: Object as () => any,
    default: undefined,
  },
  url: {
    type: String,
    default: "",
  },
  description: {
    type: Array as () => PortableTextBlock[],
    default: "",
  },
  contact: {
    type: Object as () => any,
    default: undefined,
  },
  socials: {
    type: Object as () => any,
    default: undefined,
  },
});
</script>

<style>
.text-h4.line-height-1 {
  line-height: 1.2rem !important;
}
</style>
