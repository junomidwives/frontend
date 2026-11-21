import type { SanityDocument } from "@sanity/client";

export const useBirthStoriesStore = defineStore("birthStories", () => {
  const birthStories: Ref<SanityDocument[]> = ref([]);
  const birthStory: Ref<SanityDocument | null> = ref(null);

  async function getBirthStories() {
    if (birthStories.value.length > 0) return;
    // Only the fields the list and the previous/next links use. Fetching
    // whole stories put every story's full body into each page's payload.
    const BIRTH_STORIES_QUERY = groq`*[_type == "birthStory"] | order(publishedAt desc){
      _id, title, slug, image, excerpt, publishedAt
    }`;
    const { data } = await useSanityData<SanityDocument[]>(
      BIRTH_STORIES_QUERY
    );
    if (data) birthStories.value = data.value as SanityDocument[];
  }

  async function getBirthStory(slug: string) {
    // Dereference internal links (as the blog query does): otherwise links in
    // the story have no slug and render as "/undefined".
    const BIRTH_STORY_QUERY = groq`*[_type == "birthStory" && slug.current == '${slug}'][0]{
      ...,
      content{
        ...,
        body[]{
          ...,
          markDefs[]{
            ...,
            _type == "link" => {
              ...,
              internalLink->
            }
          },
          _type == "cta" => {
            ...,
            link{
              ...,
              internalLink->
            }
          },
          _type == "pdf" => {
            ...,
            asset->
          }
        }
      }
    }`;
    const { data } = await useSanityData<SanityDocument>(BIRTH_STORY_QUERY);
    if (data) birthStory.value = data.value as SanityDocument;
  }

  return {
    birthStories,
    birthStory,
    getBirthStories,
    getBirthStory,
  };
});
