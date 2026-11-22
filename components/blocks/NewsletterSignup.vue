<template>
  <!-- A dark band. As the last block on a page (the homepage) it runs
       straight into the footer, so the two read as one. -->
  <section class="newsletter-band" aria-label="Newsletter">
    <div class="newsletter-band__inner">
      <p v-if="blurb" class="newsletter-band__blurb">{{ blurb }}</p>

      <div class="newsletter-band__action">
        <p v-if="success" class="newsletter-band__status" role="status">
          <v-icon icon="mdi-email-newsletter" size="22" />
          Thank you for subscribing!
        </p>

        <form v-else class="newsletter-band__form" novalidate @submit.prevent="submit">
          <label class="newsletter-band__field">
            <span>Name</span>
            <input
              v-model.trim="name"
              type="text"
              name="name"
              autocomplete="name"
              required
              :aria-invalid="!!errors.name"
              :aria-describedby="errors.name ? 'newsletter-name-error' : undefined"
            />
            <span v-if="errors.name" id="newsletter-name-error" class="newsletter-band__error">
              {{ errors.name }}
            </span>
          </label>

          <label class="newsletter-band__field newsletter-band__field--email">
            <span>Email</span>
            <input
              v-model.trim="email"
              type="email"
              name="email"
              autocomplete="email"
              required
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'newsletter-email-error' : undefined"
            />
            <span v-if="errors.email" id="newsletter-email-error" class="newsletter-band__error">
              {{ errors.email }}
            </span>
          </label>

          <button type="submit" class="newsletter-band__submit" :disabled="loading" aria-label="Sign up">
            <v-icon icon="mdi-arrow-right" size="22" />
          </button>
        </form>

        <p v-if="error" class="newsletter-band__status newsletter-band__status--error" role="alert">
          Something went wrong: {{ error }}
        </p>
      </div>
    </div>
  </section>
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

const loading = ref(false);
const success = ref(false);
const error = ref("");
const errors = reactive({ name: "", email: "" });

function validate() {
  errors.name = name.value ? "" : "Name is required";
  errors.email = !email.value
    ? "Email is required"
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
      ? ""
      : "Invalid email address";
  return !errors.name && !errors.email;
}

async function submit() {
  error.value = "";
  if (!validate()) return;

  loading.value = true;
  try {
    await subscribe();
    name.value = "";
    email.value = "";
    success.value = true;
  } catch (e: any) {
    error.value = e?.message ?? String(e);
  } finally {
    loading.value = false;
  }
}
</script>

<style>
.newsletter-band {
  /* Full-bleed background without making the page scroll sideways (same
     technique as .quote-band). */
  background: rgb(var(--v-theme-deep));
  border-image: linear-gradient(rgb(var(--v-theme-deep)) 0 0) fill 0 / 0 / 0 100vw;
  color: #fff;
}

/* As the page's last block, close the gap to the footer (the page
   builder's block margin plus the container's padding). */
.newsletter-band:last-child {
  margin-bottom: -16px !important;
}

.newsletter-band__inner {
  /* The footer's 1120px column, less the page container's 16px each side. */
  max-width: 1088px;
  margin: 0 auto;
  /* 8px + the page container's 16px = the footer's 24px, so edges line up. */
  padding: 64px 8px 48px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px 64px;
  position: relative;
}

/* Divider above the footer, inset to line up with the content. */
.newsletter-band__inner::after {
  content: "";
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}

.newsletter-band__blurb,
.content p.newsletter-band__blurb {
  flex: 1 1 360px;
  max-width: 480px;
  margin: 0;
  font-size: 1.375rem;
  /* Beats the site-wide `.content p` line-height, which is for body copy. */
  line-height: 1.45 !important;
}

.newsletter-band__action {
  flex: 1 1 380px;
}

.newsletter-band__form {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px;
}

.newsletter-band__field {
  flex: 1 1 160px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.875rem;
  color: rgb(var(--v-theme-mint));
}

.newsletter-band__field--email {
  flex-basis: 200px;
}

.newsletter-band__field input {
  padding: 13px 16px;
  border-radius: 12px;
  border: 1px solid #fff;
  background: #fff;
  color: rgb(var(--v-theme-ink));
  font: inherit;
  font-size: 1rem;
}

.newsletter-band__field input[aria-invalid="true"] {
  border-color: rgb(var(--v-theme-pink));
  box-shadow: 0 0 0 2px rgb(var(--v-theme-pink));
}

.newsletter-band__error {
  color: rgb(var(--v-theme-pink));
}

.newsletter-band__submit {
  flex: none;
  /* Line up with the inputs, below their labels. */
  margin-top: 27px;
  width: 50px;
  height: 50px;
  border: 0;
  border-radius: 999px;
  background: rgb(var(--v-theme-pink));
  color: rgb(var(--v-theme-deep));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.newsletter-band__submit:disabled {
  opacity: 0.6;
  cursor: progress;
}

.newsletter-band__status {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.125rem;
}

.newsletter-band__status--error {
  margin-top: 12px;
  font-size: 1rem;
  color: rgb(var(--v-theme-pink));
}
</style>
