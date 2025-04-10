import { defineStore } from "pinia";
import type { SanityDocument } from "@sanity/client";

type Item = {
  title: string;
  slug: {
    current: string;
  };
  category?: string;
};

export const useNavigationStore = defineStore("navigation", () => {
  const items: Ref<Item[]> = ref([]);

  async function getItems() {
    const SITE_QUERY = groq`*[_id == "siteSettings"][0]{mainNav[]->{slug, title, category}}`;
    const { data } = await useSanityQuery<SanityDocument>(SITE_QUERY);
    if (data.value) items.value = data.value.mainNav;
  }

  return {
    getItems,
    items,
  };
});
