<template>
  <v-container max-width="600" class="mx-auto pt-16">
    <v-row v-if="success || error">
      <v-col>
        <v-alert
          v-if="success"
          color="success"
          icon="mdi-email-fast"
          variant="tonal"
        >
          <h3 class="text-h6 font-weight-bold">Thank you!</h3>
          <p class="text-body-1">We will get back to you shortly.</p>
        </v-alert>

        <v-alert
          v-if="error"
          color="error"
          icon="mdi-alert-circle"
          variant="tonal"
        >
          <h3 class="text-h6 font-weight-bold">Something went wrong</h3>
          <p class="text-body-1">{{ error }}</p>
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-form
          name="contact"
          @submit.prevent="submit"
          ref="form"
          class="d-flex flex-column ga-4"
          data-netlify="true"
        >
          <v-text-field
            v-model="name"
            label="Name"
            name="name"
            type="text"
            required
            variant="outlined"
            :rules="[(v: any) => !!v || 'Name is required']"
            hide-details="auto"
          />
          <v-text-field
            v-model="email"
            label="Email"
            name="email"
            type="email"
            required
            variant="outlined"
            :rules="[
              (v: any) => !!v || 'Email is required', 
              (v: any) => v.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || 'Invalid email address'
            ]"
            hide-details="auto"
          />

          <v-textarea
            v-model="message"
            label="Message"
            name="message"
            type="text"
            required
            variant="outlined"
            :rules="[(v: any) => !!v || 'Message is required']"
            hide-details="auto"
          />
          <v-btn block type="submit" color="primary" :loading="loading">
            Send
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p>
          Alternatively, send us an email at hello@junomidwives.co.uk
          <br />We aim to respond to messages within 72 hours
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { setHeroText } = useHero();
setHeroText("Contact Us");

const form = ref<HTMLFormElement>();
const name = ref("");
const email = ref("");
const message = ref("");
const loading = ref(false);
const success = ref(false);
const error = ref(null);

async function submit() {
  loading.value = true;

  try {
    const { valid } = await form.value?.validate();
    if (!valid) return;

    const response = await post();
    if (response.ok) {
      reset();
      success.value = true;
    } else {
      error.value = await response.json();
    }
  } catch (e: any) {
    error.value = e;
  } finally {
    loading.value = false;
  }
}

async function post() {
  return await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      message: message.value,
    }),
  });
}

function reset() {
  error.value = null;
  form.value?.reset();
}
</script>
