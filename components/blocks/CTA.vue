<template>
  <v-container v-if="url">
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn
          v-bind="url"
          color="secondary"
          rounded="xl"
          class="px-10 mb-4"
          size="large"
        >
          {{
            props.file
              ? props.file.description
              : props.link.text || props.link.internalLink.title
          }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps({
  link: {
    type: Object,
    default: null,
  },
  file: {
    type: Object,
    default: null,
  },
});

const url = computed(() => {
  if (props.link) return { nuxt: true, to: linkUrl(props.link) };
  if (props.file) return { href: fileUrl(props.file) };
  return {};
});

function linkUrl(link: any) {
  if (link.type === "internal") {
    let url = "/" + link.internalLink.slug.current;
    if (link.anchor) url += `#${link.anchor}`;
    return url;
  }
  return link.url;
}

function fileUrl(file: any) {
  return file.asset.url;
}
</script>
