import type { SanityDocument } from "@sanity/client";

export const useBlogStore = defineStore("blog", () => {
  const blogs: Ref<SanityDocument[]> = ref([]);
  const blog: Ref<SanityDocument | null> = ref(null);

  async function getBlogs() {
    if (blogs.value?.length) return;
    // Only the fields the list and the previous/next links use. Fetching
    // whole posts put every post's full body into each page's payload (~1 MB).
    const BLOGS_QUERY = groq`*[_type == "blog"] | order(publishedAt desc){
      _id, title, slug, image, publishedAt
    }`;
    const { data } = await useSanityData<SanityDocument[]>(BLOGS_QUERY);
    if (data) blogs.value = data.value as SanityDocument[];
  }

  async function getBlog(slug: string) {
    const BLOG_QUERY = groq`*[_type == "blog" && slug.current == '${slug}'][0]{
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
    const { data } = await useSanityData<SanityDocument>(BLOG_QUERY);
    if (data) blog.value = data.value as SanityDocument;
  }

  return {
    blogs,
    blog,
    getBlogs,
    getBlog,
  };
});
