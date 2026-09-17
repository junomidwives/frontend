<template>
  <v-container v-if="embedUrl">
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-responsive :aspect-ratio="16 / 9">
          <iframe
            :src="embedUrl"
            :title="caption || 'Video'"
            width="100%"
            height="100%"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </v-responsive>
        <p v-if="caption" class="text-caption text-center line-height-1 mt-2">{{ caption }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
});

const embedUrl = computed(() => {
  let parsed: URL;
  try {
    parsed = new URL(props.url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "");

  if (host === "youtu.be") {
    const id = parsed.pathname.slice(1);
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }

  if (host === "youtube.com" || host === "m.youtube.com") {
    if (parsed.pathname === "/watch") {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (parsed.pathname.startsWith("/embed/")) {
      return `https://www.youtube-nocookie.com${parsed.pathname}`;
    }
    return null;
  }

  if (host === "vimeo.com") {
    const id = parsed.pathname.split("/").filter(Boolean).pop();
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }

  if (host === "player.vimeo.com") {
    return props.url;
  }

  return null;
});
</script>

<style>
.text-caption.line-height-1 {
  line-height: 1.1rem !important;
}
</style>
