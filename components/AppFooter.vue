<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__top">
        <nuxt-link to="/" class="site-footer__logo" aria-label="Juno Midwives home">
          <img src="/img/logo-footer.svg" alt="Juno Midwives" width="187" height="52" />
        </nuxt-link>

        <nav v-if="footerItems.length" class="site-footer__nav" aria-label="Footer">
          <nuxt-link v-for="item in footerItems" :key="item.slug" :to="`/${item.slug}`">
            {{ item.title }}
          </nuxt-link>
        </nav>

        <div class="site-footer__social">
          <a
            href="https://www.instagram.com/junomidwives/"
            target="_blank"
            rel="noopener"
            aria-label="Instagram (opens in a new tab)"
          >
            <v-icon icon="mdi-instagram" size="20" />
          </a>
          <nuxt-link to="/contact-us" aria-label="Contact us">
            <v-icon icon="mdi-email-outline" size="20" />
          </nuxt-link>
          <a
            href="https://www.facebook.com/profile.php?id=100093169811850"
            target="_blank"
            rel="noopener"
            aria-label="Facebook (opens in a new tab)"
          >
            <v-icon icon="mdi-facebook" size="20" />
          </a>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p class="site-footer__meta">
          <span>© 2025 junomidwives.co.uk</span>
          <span>Website by <a href="https://stuartsewell.dev">stuartsewell.dev</a></span>
        </p>
        <nav class="site-footer__legal" aria-label="Legal">
          <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>
          <nuxt-link to="/terms-conditions">Terms and Conditions</nuxt-link>
          <nuxt-link to="/cookie-policy">Cookie Policy</nuxt-link>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { footerItems } = storeToRefs(useNavigationStore());
</script>

<style>
.site-footer {
  background: rgb(var(--v-theme-deep));
  color: #dbe7e5;
  font-size: 0.9375rem;
  line-height: 1.6;
}

.site-footer__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 56px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.site-footer__top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px 32px;
}

.site-footer__logo img {
  display: block;
  width: auto;
  height: 52px;
}

.site-footer__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 32px;
  font-size: 1rem;
}

.site-footer__nav a {
  color: #fff;
  text-decoration: none;
}

.site-footer__nav a:hover {
  text-decoration: underline;
}

.site-footer__social {
  display: flex;
  gap: 10px;
}

.site-footer__social a {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.site-footer__social a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.site-footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px 24px;
  font-size: 0.875rem;
}

.site-footer__meta {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
}

.site-footer__legal {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
}

.site-footer__meta a,
.site-footer__legal a {
  color: rgb(var(--v-theme-mint));
}

/* Phones: logo and social icons on one row, links in a 2x2 grid, then a
   divider, copyright and the legal links. */
@media (max-width: 700px) {
  .site-footer__top {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
  }
  .site-footer__logo img {
    height: 44px;
  }
  .site-footer__nav {
    grid-column: 1 / -1;
    grid-row: 2;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px 24px;
  }
  .site-footer__bottom {
    flex-direction: column;
    gap: 14px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
  }
}
</style>
