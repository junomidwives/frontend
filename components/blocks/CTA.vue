<template>
  <v-container v-if="url">
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn
          v-bind="url"
          color="secondary"
          rounded="pill"
          class="px-10 mb-4"
          size="large"
          :stacked="xs"
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
import { useDisplay } from "vuetify";

const { xs } = useDisplay();

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
  if (props.link) return { nuxt: true, ...linkUrl(props.link) };
  if (props.file) return { href: fileUrl(props.file) };
  return {};
});

function linkUrl(link: any) {
  if (link.type === "internal") {
    let url = "/" + link.internalLink.slug.current;
    if (link.anchor) url += link.anchor;
    return { to: url };
  }
  return { href: link.url };
}

function fileUrl(file: any) {
  return file.asset.url;
}
</script>

<style scoped>
.materialDesignButton {
  color: #fff;
  border-radius: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1.04em;
  letter-spacing: 0.05em;
  width: auto;
  transition: 0.3s;
}

.materialDesignButton:hover {
  opacity: 0.7;
}
</style>
