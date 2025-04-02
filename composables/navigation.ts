type MenuItem = {
  title: string;
  link?: string;
  subitems?: MenuItem[];
};
const menuItems: Ref<MenuItem[]> = ref([]);

export function useNavigation() {
  function setMenuItems(items: any) {
    if (items) {
      menuItems.value = [];

      for (const item of items) {
        if (item.category) {
          const category = menuItems.value.find(
            (i) => i.title === item.category
          );
          if (category) {
            category.subitems?.push({
              title: item.title,
              link: `/${item.slug.current}`,
            });
          } else {
            menuItems.value.push({
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

        menuItems.value.push({
          title: item.title,
          link: `/${item.slug.current}`,
        });
      }
    }
  }

  return {
    menuItems,
    setMenuItems,
  };
}
