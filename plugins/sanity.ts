import imageUrlBuilder from "@sanity/image-url";
import { NuxtLink } from "#components";

export default defineNuxtPlugin(() => {
  const sanityConfig = useSanity().config as {
    projectId: string;
    dataset: string;
  };

  const builder = imageUrlBuilder(sanityConfig);

  function urlFor(source: any) {
    if (!source?.asset)
      return {
        url: () => undefined,
      };

    return builder.image(source).auto("format");
  }
  function renderLink(link: any, { slots }: any) {
    if (link.type === "internal") {
      const prefix = getPrefix(link.internalLink?._type);
      let to = `${prefix}${link.internalLink?.slug?.current}`;
      if (link.anchor) to += `#${link.anchor}`;
      return h(NuxtLink, { to }, () => slots.default?.());
    }

    return h(NuxtLink, { href: link.url, external: true }, () =>
      slots.default?.()
    );
  }

  function renderLink2({ value, text }: any) {
    if (value?.type === "internal") {
      const prefix = getPrefix(value.internalLink?._type);
      let to = `${prefix}${value.internalLink?.slug?.current}`;
      if (value.anchor) to += `#${value.anchor}`;
      return h(NuxtLink, { to }, () => text);
    }

    return h(NuxtLink, { href: value?.url, external: true }, () => text);
  }

  function getPrefix(pageType: string) {
    switch (pageType) {
      case "blog":
        return "/blog/";
      case "birthStory":
        return "/birth-stories/";
      default:
        return "/";
    }
  }

  return {
    provide: { urlFor, renderLink, renderLink2 },
  };
});
