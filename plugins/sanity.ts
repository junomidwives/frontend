import imageUrlBuilder from "@sanity/image-url";

export default defineNuxtPlugin(() => {
  const sanityConfig = useSanity().config as {
    projectId: string;
    dataset: string;
  };

  const builder = imageUrlBuilder(sanityConfig);

  function urlFor(source: any) {
    return builder.image(source).auto("format");
  }

  return {
    provide: { urlFor },
  };
});
