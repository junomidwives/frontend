import type { SanityDocument } from "@sanity/client";

const birthStories: Ref<SanityDocument[]> = ref([]);
const birthStory: Ref<SanityDocument | null> = ref(null);

export function useBirthStories() {
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

  const prevousBirthStory = computed(() => {
    const index = birthStories.value.findIndex(
      (story) => story.slug.current === birthStory.value?.slug.current
    );
    if (index === 0) return null;
    return birthStories.value[index - 1];
  });

  const nextBirthStory = computed(() => {
    const index = birthStories.value.findIndex(
      (story) => story.slug.current === birthStory.value?.slug.current
    );
    if (index === birthStories.value.length - 1) return null;
    return birthStories.value[index + 1];
  });

  return {
    birthStories,
    birthStory,
    prevousBirthStory,
    nextBirthStory,
    getBirthStories,
    getBirthStory,
  };
}
