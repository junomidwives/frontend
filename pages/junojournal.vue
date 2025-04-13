<template>
  <v-container max-width="600" class="mx-auto pt-8">
    <v-row>
      <v-col cols="12">
        <v-img
          src="/img/newsletter.jpg"
          cover
          width="100%"
          max-height="300"
          rounded="xl"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col v-if="success || error">
        <v-alert
          v-if="success"
          color="success"
          icon="mdi-email-newsletter"
          variant="tonal"
        >
          <h3 class="text-h6 font-weight-bold mt-n1">
            Thank you for subscribing!
          </h3>
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

      <v-col v-else>
        <p class="text-body-1 text-center">
          Sign up here for our monthly newsletter full of information and
          resources
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-form
          name="newsletter"
          ref="form"
          class="d-flex flex-column ga-4"
          @submit.prevent="submit"
        >
          <v-text-field
            label="Name"
            name="name"
            type="text"
            required
            variant="outlined"
            :rules="[(v: any) => !!v || 'Name is required']"
            hide-details="auto"
            v-model="name"
            rounded="lg"
          />
          <v-text-field
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
            v-model="email"
            rounded="lg"
          />

          <v-btn
            block
            type="submit"
            color="secondary"
            :loading="loading"
            rounded="pill"
            size="large"
          >
            Subscribe
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { setHeroText } = useHero();
setHeroText("Juno Journal");

const form = ref<HTMLFormElement>();
const name = ref("");
const email = ref("");
const loading = ref(false);
const success = ref(false);
const error = ref(null);

async function submit() {
  loading.value = true;

  try {
    const { valid } = await form.value?.validate();
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

async function subscribe() {
  try {
    await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_MAILERLITE_TOKEN,
      },
      body: JSON.stringify({
        email: email.value,
        fields: {
          name: name.value,
        },
        groups: [import.meta.env.VITE_MAILERLITE_GROUP],
      }),
    });
  } catch (e: any) {
    throw e;
  }
}

function reset() {
  error.value = null;
  form.value?.reset();
}
</script>
