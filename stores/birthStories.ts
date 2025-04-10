import type { SanityDocument } from "@sanity/client";

export const useBirthStoriesStore = defineStore("birthStories", () => {
  const birthStories: Ref<SanityDocument[]> = ref([]);
  const birthStory: Ref<SanityDocument | null> = ref(null);

  async function getBirthStories() {
    if (birthStories.value.length > 0) return;
    const BIRTH_STORIES_QUERY = groq`*[_type == "birthStory"]  | order(publishedAt desc)`;
    const { data } = await useSanityQuery<SanityDocument[]>(
      BIRTH_STORIES_QUERY
    );
    if (data) birthStories.value = data.value as SanityDocument[];
  }

  async function getBirthStory(slug: string) {
    const BIRTH_STORY_QUERY = groq`*[_type == "birthStory" && slug.current == '${slug}'][0]`;
    const { data } = await useSanityQuery<SanityDocument>(BIRTH_STORY_QUERY);
    if (data) birthStory.value = data.value as SanityDocument;
  }

  return {
    birthStories,
    birthStory,
    getBirthStories,
    getBirthStory,
  };
});
