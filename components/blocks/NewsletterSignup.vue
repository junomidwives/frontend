<template>
  <v-container>
    <v-row>
      <v-col v-if="success || error">
        <v-alert
          v-if="success"
          color="success"
          icon="mdi-email-newsletter"
          variant="tonal"
          max-width="500"
          class="mx-auto"
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
          max-width="500"
          class="mx-auto"
        >
          <h3 class="text-h6 font-weight-bold">Something went wrong</h3>
          <p class="text-body-1">{{ error }}</p>
        </v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="10" offset-sm="1" md="6" offset-md="3" class="mb-6">
        <p v-if="blurb" class="text-body-1 text-center mb-4">
          {{ blurb }}
        </p>
        <v-form name="newsletter" ref="form" @submit.prevent="submit">
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
              (v: any) =>
                v.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
                'Invalid email address',
            ]"
            ref="emailInput"
          />
          <v-btn v-show="false" type="submit" :disabled="loading" />
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
defineProps({
  blurb: {
    type: String,
    default:
      "Join our mailing list and stay connected. We’ll only email when there’s something worth sharing, like a new blog post or an upcoming event.",
  },
});

const { subscribe } = useNewsletterStore();
const { name, email } = storeToRefs(useNewsletterStore());

const form = ref<HTMLFormElement>();
const emailInput = ref<HTMLInputElement>();
const loading = ref(false);
const success = ref(false);
const error = ref("");

async function submit() {
  loading.value = true;
  error.value = "";

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

function reset() {
  error.value = "";
  form.value?.reset();
  emailInput.value?.blur();
}
</script>
