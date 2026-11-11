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
    if (data.value) {
      items.value = data.value.mainNav;
      footerItems.value = data.value.footerNav ?? [];
    }
  }

  return {
    getItems,
    items,
    footerItems,
  };
});
