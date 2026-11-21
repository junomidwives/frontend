<template>
  <header class="site-header" @keydown.esc="showMenu = false">
    <div class="site-header__bar">
      <nuxt-link to="/" class="site-header__logo" aria-label="Juno Midwives home">
        <img src="/img/logo-text.svg" alt="Juno Midwives" width="150" height="56" />
      </nuxt-link>

      <!-- Wide screens: the nav itself. Lower-priority links drop out as the
           window narrows (see the media queries); they stay in the menu. -->
      <nav class="site-nav" aria-label="Main">
        <template v-for="item in links" :key="item.title">
          <v-menu v-if="item.subitems" open-on-hover location="bottom start" offset="8">
            <template #activator="{ props }">
              <button
                v-bind="props"
                type="button"
                class="site-nav__link"
                :class="{ 'site-nav__link--low': item.low }"
              >
                {{ item.title }}
                <v-icon icon="mdi-chevron-down" size="18" />
              </button>
            </template>
            <v-list class="site-nav__dropdown" density="comfortable">
              <v-list-item
                v-for="sub in item.subitems"
                :key="sub.title"
                :to="sub.link"
                :title="sub.title"
              />
            </v-list>
          </v-menu>

          <nuxt-link
            v-else
            :to="item.link"
            class="site-nav__link"
            :class="{ 'site-nav__link--low': item.low }"
          >
            {{ item.title }}
          </nuxt-link>
        </template>

        <nuxt-link v-if="cta" :to="cta.link" class="site-nav__cta">
          {{ cta.title }}
        </nuxt-link>
      </nav>

      <button
        type="button"
        class="site-header__toggle"
        aria-controls="site-menu"
        :aria-expanded="String(showMenu)"
        :aria-label="showMenu ? 'Close menu' : 'Open menu'"
        @click="showMenu = !showMenu"
      >
        <v-icon :icon="showMenu ? 'mdi-close' : 'mdi-menu'" />
      </button>
    </div>

    <!-- Narrower screens: the full menu, opened by the button above. -->
    <nav v-show="showMenu" id="site-menu" class="site-menu" aria-label="Menu">
      <template v-for="item in links" :key="item.title">
        <div v-if="item.subitems" class="site-menu__group">
          <span class="site-menu__label">{{ item.title }}</span>
          <nuxt-link
            v-for="sub in item.subitems"
            :key="sub.title"
            :to="sub.link"
            class="site-menu__sublink"
          >
            {{ sub.title }}
          </nuxt-link>
        </div>
        <nuxt-link v-else :to="item.link" class="site-menu__link">
          {{ item.title }}
        </nuxt-link>
      </template>

      <nuxt-link v-if="cta" :to="cta.link" class="site-menu__cta">
        {{ cta.title }}
      </nuxt-link>
    </nav>
  </header>
</template>

<script setup lang="ts">
type MenuItem = {
  title: string;
  link?: string;
  low?: boolean;
  subitems?: MenuItem[];
};

// Shown as the button at the end of the nav (and in the menu).
const CTA_SLUG = "book-an-intro-chat";
// First to drop out of the nav when there isn't room (still in the menu).
const LOW_PRIORITY_SLUGS = new Set(["faqs", "contact-us"]);

const route = useRoute();
const showMenu = ref(false);
watch(
  () => route.fullPath,
  () => (showMenu.value = false),
);

const { items } = storeToRefs(useNavigationStore());

const cta = computed<MenuItem | undefined>(() => {
  const item = items.value.find((i) => i.slug.current === CTA_SLUG);
  return item ? { title: item.title, link: `/${item.slug.current}` } : undefined;
});

// The Sanity nav, with pages in a category grouped under it.
const links = computed(() => {
  const menuItems: MenuItem[] = [];

  for (const item of items.value) {
    if (item.slug.current === CTA_SLUG) continue;
    const link = `/${item.slug.current}`;

    if (item.category) {
      const category = menuItems.find((i) => i.title === item.category);
      if (category) {
        category.subitems?.push({ title: item.title, link });
      } else {
        menuItems.push({
          title: item.category,
          subitems: [{ title: item.title, link }],
        });
      }
      continue;
    }

    menuItems.push({
      title: item.title === "Frequently Asked Questions" ? "FAQs" : item.title,
      link,
      low: LOW_PRIORITY_SLUGS.has(item.slug.current),
    });
  }

  return menuItems;
});
</script>

<style>
.site-header {
  position: sticky;
  top: 0;
  z-index: 1006;
  background: #fff;
  border-bottom: 1px solid rgb(var(--v-theme-line));
}

.site-header__bar {
  max-width: 1240px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 16px 32px;
}

.site-header__logo img {
  display: block;
  width: 150px;
  height: 56px;
  object-fit: contain;
}

.site-nav {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 26px;
  font-size: 1rem;
  line-height: 1.4;
}

.site-nav__link {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 6px 0;
  border: 0;
  background: none;
  font: inherit;
  color: rgb(var(--v-theme-ink));
  text-decoration: none;
  cursor: pointer;
}

.site-nav__link:hover,
.site-nav__link.router-link-active {
  color: rgb(var(--v-theme-primary));
}

.site-nav__cta,
.site-menu__cta {
  border-radius: 999px;
  background: rgb(var(--v-theme-primary));
  color: #fff;
  font-weight: 700;
  text-decoration: none;
}

.site-nav__cta {
  padding: 11px 20px;
}

.site-nav__cta:hover,
.site-menu__cta:hover {
  background: rgb(var(--v-theme-primary-darken-1));
  color: #fff;
}

.site-nav__dropdown .v-list-item-title {
  font-size: 1rem;
  color: rgb(var(--v-theme-ink));
}

.site-header__toggle {
  display: none;
  flex: none;
  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 999px;
  background: rgb(var(--v-theme-tint));
  color: rgb(var(--v-theme-ink));
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.site-menu {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 24px 28px;
  background: #fff;
  border-bottom: 1px solid rgb(var(--v-theme-line));
  box-shadow: 0 16px 32px rgba(31, 46, 53, 0.1);
  font-size: 1.125rem;
  line-height: 1.4;
}

.site-menu__link,
.site-menu__group {
  padding: 16px 0;
  border-bottom: 1px solid rgb(var(--v-theme-line));
}

.site-menu__link,
.site-menu__label {
  color: rgb(var(--v-theme-ink));
  text-decoration: none;
}

.site-menu__group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.site-menu__sublink {
  padding: 4px 0 4px 16px;
  border-left: 2px solid rgb(var(--v-theme-mint));
  color: rgb(var(--v-theme-body));
  font-size: 1rem;
  text-decoration: none;
}

.site-menu__cta {
  margin-top: 24px;
  padding: 15px 20px;
  text-align: center;
}

/* Below 1080px the full nav doesn't fit: drop FAQs and Contact Us and
   show the menu button (the menu has everything). */
@media (max-width: 1079px) {
  .site-header__toggle {
    display: flex;
  }
  .site-nav__link--low {
    display: none;
  }
}

/* Tablets: just the intro chat button and the menu. */
@media (max-width: 960px) {
  .site-nav__link {
    display: none;
  }
}

/* Phones: logo and menu button only. */
@media (max-width: 700px) {
  .site-nav {
    display: none;
  }
  .site-header__toggle {
    margin-left: auto;
  }
}

@media (min-width: 1080px) {
  .site-menu {
    display: none !important;
  }
}
</style>
