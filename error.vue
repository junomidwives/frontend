<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container class="content py-12" fluid>
        <v-row>
          <v-col cols="12" class="text-center">
            <p class="text-overline text-medium-emphasis">404</p>
            <h1 class="text-h4 mb-3">Page not found</h1>
            <p class="text-body-1 text-medium-emphasis mb-8">
              Here are some helpful links to get you where you need to go.
            </p>
          </v-col>
        </v-row>

        <v-row v-if="activeLinks.length" justify="center">
          <v-col cols="12" sm="8" md="5" lg="4">
            <template v-for="item in activeLinks" :key="item.link.text">
              <v-btn
                v-if="item.link.type === 'internal'"
                :to="resolveInternalLink(item.link)"
                block
                color="primary"
                variant="tonal"
                class="mb-3 text-none"
                size="large"
              >
                {{ item.link.text }}
              </v-btn>
              <v-btn
                v-else
                :href="item.link.url"
                target="_blank"
                block
                color="primary"
                variant="tonal"
                class="mb-3 text-none"
                size="large"
              >
                {{ item.link.text }}
              </v-btn>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const { getItems } = useNavigationStore();
await getItems();

const BIO_LINKS_QUERY = groq`*[_id == "bioLinks"][0]{
  links[active == true]{
    link{
      ...,
      internalLink->
    }
  }
}`;

const { data } = await useSanityQuery<SanityDocument>(BIO_LINKS_QUERY);

const activeLinks = computed(() => data.value?.links ?? []);

function resolveInternalLink(link: any) {
  const prefix = getPrefix(link.internalLink?._type);
  let to = `${prefix}${link.internalLink?.slug?.current}`;
  if (link.anchor) to += `#${link.anchor}`;
  return to;
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
</script>
