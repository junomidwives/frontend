<template>
  <v-container max-width="600" class="mx-auto">
    <v-form name="contact" netlify>
      <v-text-field label="Name" name="name" type="text" required />
      <v-text-field label="Email" name="email" type="email" required />
      <v-text-field label="Message" name="message" type="text" required />
      <v-btn type="submit" color="primary" class="mt-4">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
const { setHeroText } = useHero();
setHeroText("Contact Us");
</script>
