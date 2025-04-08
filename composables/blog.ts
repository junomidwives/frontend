import type { SanityDocument } from "@sanity/client";

const blogs: Ref<SanityDocument[]> = ref([]);
const blog: Ref<SanityDocument | null> = ref(null);

export function useBlog() {
  async function getBlogs() {
    if (blogs.value?.length) return;
    const BLOGS_QUERY = groq`*[_type == "blog"]  | order(publishedAt desc)`;
    const { data } = await useSanityQuery<SanityDocument[]>(BLOGS_QUERY);
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
          }
        }
      }
    }`;
    const { data } = await useSanityQuery<SanityDocument>(BLOG_QUERY);
    if (data) blog.value = data.value as SanityDocument;
  }

  const previousBlog = computed(() => {
    if (!blog.value) return;
    const index = blogs.value.findIndex(
      (story) => story.slug.current === blog.value?.slug.current
    );
    if (index === 0) return null;
    return blogs.value[index - 1];
  });

  const nextBlog = computed(() => {
    if (!blog.value) return;
    const index = blogs.value.findIndex(
      (story) => story.slug.current === blog.value?.slug.current
    );
    if (index === blogs.value.length - 1) return null;
    return blogs.value[index + 1];
  });

  return {
    blogs,
    blog,
    previousBlog,
    nextBlog,
    getBlogs,
    getBlog,
  };
}
