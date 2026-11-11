import { h, type FunctionalComponent } from "vue";

// Renderers for the Studio's "Large text" block styles (cms LargeTextStyle.tsx).
// They look like a Heading 1 but are paragraphs, so a page keeps a single H1.
// Styling lives in settings.scss (.text-large, .text-large--divider).

const largeText =
  (divider: boolean): FunctionalComponent =>
  (_, { slots }) =>
    h(
      "p",
      { class: ["text-large", { "text-large--divider": divider }] },
      slots.default?.(),
    );

// For <SanityContent :serializers> (keyed by block style).
export const largeTextSerializerStyles = {
  large: largeText(false),
  largeDivider: largeText(true),
};

// For @portabletext/vue <PortableText :components> (`block` renderers).
export const largeTextPortableTextBlocks = {
  large: (_: unknown, { slots }: any) =>
    h("p", { class: "text-large" }, slots.default?.()),
  largeDivider: (_: unknown, { slots }: any) =>
    h("p", { class: "text-large text-large--divider" }, slots.default?.()),
};
