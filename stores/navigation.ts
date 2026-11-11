import { defineStore } from "pinia";
import type { SanityDocument } from "@sanity/client";

type Item = {
  title: string;
  slug: {
    current: string;
  };
  category?: string;
};

type FooterItem = {
  title: string;
  slug: string;
};

export const useNavigationStore = defineStore("navigation", () => {
  const items: Ref<Item[]> = ref([]);
  const footerItems: Ref<FooterItem[]> = ref([]);

  async function getItems() {
    const SITE_QUERY = groq`*[_id == "siteSettings"][0]{
      mainNav[]->{slug, title, category},
      "footerNav": footerNav[defined(page->slug.current)]{
        "title": coalesce(label, page->title),
        "slug": page->slug.current
      }
    }`;
    const { data } = await useSanityQuery<SanityDocument>(SITE_QUERY);
    // Keep following `data`: in the Studio's Preview tab it updates live as
    // Site Settings drafts change. On the live site it's set once.
    watch(
      data,
      (value) => {
        if (!value) return;
        items.value = value.mainNav ?? [];
        footerItems.value = value.footerNav ?? [];
      },
      { immediate: true },
    );
  }

  return {
    getItems,
    items,
    footerItems,
  };
});
