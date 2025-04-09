import { defineStore } from "pinia";
import type { SanityDocument } from "@sanity/client";

type MenuItem = {
  title: string;
  link?: string;
  subitems?: MenuItem[];
};

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
    if (data.value) items.value = data.value?.mainNav;
  }

  const menuItems = computed(() => {
    const menuItems: MenuItem[] = [];

    for (const item of items.value) {
      if (item.category) {
        const category = menuItems.find((i) => i.title === item.category);
        if (category) {
          category.subitems?.push({
            title: item.title,
            link: `/${item.slug.current}`,
          });
        } else {
          menuItems.push({
            title: item.category,
            subitems: [
              {
                title: item.title,
                link: `/${item.slug.current}`,
              },
            ],
          });
        }
        continue;
      }

      menuItems.push({
        title: item.title,
        link: `/${item.slug.current}`,
      });
    }

    return menuItems;
  });

  return {
    getItems,
    menuItems,
  };
});
