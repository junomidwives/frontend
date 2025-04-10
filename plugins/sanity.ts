import imageUrlBuilder from "@sanity/image-url";
import { NuxtLink } from "#components";

export default defineNuxtPlugin(() => {
  const sanityConfig = useSanity().config as {
    projectId: string;
    dataset: string;
  };

  const builder = imageUrlBuilder(sanityConfig);

  function urlFor(source: any) {
    return builder.image(source).auto("format");
  }

  function renderLink(link: any, { slots }: any) {
    if (link.type === "internal") {
      let to = link.internalLink?.slug?.current;
      if (link.anchor) to += `#${link.anchor}`;
      return h(NuxtLink, { to }, () => slots.default?.());
    }

    return h(NuxtLink, { href: link.url, external: true }, () =>
      slots.default?.()
    );
  }

  return {
    provide: { urlFor, renderLink },
  };
});
