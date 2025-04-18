<template>
  <v-container class="content" fluid>
    <page-builder v-if="data" :blocks="data.homePage?.content" />

    <v-row class="bg-grey-lighten-5 mb-4 py-6">
      <v-col cols="12" sm="10" offset-sm="1" md="6" offset-md="3">
        <p class="text-body-1 text-center">
          Sign up here for our monthly newsletter full of information and
          resources
        </p>
        <v-form name="newsletter" ref="homeForm" @submit.prevent="submit">
          <v-text-field
            v-model="name"
            label="Name"
            density="compact"
            variant="outlined"
            hide-details="auto"
            class="mb-4 mx-auto"
            bg-color="white"
            max-width="500"
            :rules="[(v: any) => !!v || 'Name is required']"
          />
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            density="compact"
            variant="outlined"
            hide-details="auto"
            append-inner-icon="mdi-arrow-right"
            class="mx-auto"
            bg-color="white"
            max-width="500"
            @click:append-inner="submit"
            :rules="[
              (v: any) => !!v || 'Email is required', 
              (v: any) => v.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Invalid email address'
            ]"
            ref="emailInput"
          />
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const { setHeroText } = useHero();
setHeroText("");

const SITE_QUERY = groq`*[_id == "siteSettings"][0]{
  homePage->{
    ...,
    content[]{
      ...,
      body[]{
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            ...,
            internalLink->
          }
        }
      } 
    }
  }
}`;
const { data } = await useSanityQuery<SanityDocument>(SITE_QUERY);

const { subscribe } = useNewsletterStore();
const { name, email } = storeToRefs(useNewsletterStore());

const homeForm = ref<HTMLFormElement>();
const emailInput = ref<HTMLInputElement>();
const loading = ref(false);
const success = ref(false);
const error = ref(null);

async function submit() {
  loading.value = true;

  try {
    const { valid } = await homeForm.value?.validate();
    if (!valid) return;

    await subscribe();
    reset();
    success.value = true;
  } catch (e: any) {
    error.value = e;
  } finally {
    loading.value = false;
  }
}

function reset() {
  error.value = null;
  homeForm.value?.reset();
  emailInput.value?.blur();
}
</script>
