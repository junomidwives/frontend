<template>
  <v-container>
    <v-btn @click="sendEmail">Send Email</v-btn>
    <page-builder v-if="data" :blocks="data.homePage?.content" />
  </v-container>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const { setHeroText } = useHero();
setHeroText("");

const SITE_QUERY = groq`*[_id == "siteSettings"][0]{homePage->}`;
const { data } = await useSanityQuery<SanityDocument>(SITE_QUERY);

const { $mail } = useNuxtApp();

function sendEmail() {
  $mail.send({
    from: "John Doe",
    subject: "Incredible",
    text: "This is an incredible test message",
  });
}
</script>
