<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// One address per page for search engines: the live URL, no trailing slash.
const route = useRoute();
const { siteUrl } = useRuntimeConfig().public;
const canonical = computed(
  () => siteUrl + (route.path === "/" ? "/" : route.path.replace(/\/$/, "")),
);
useHead({ link: [{ rel: "canonical", href: canonical }] });

useSeoMeta({
  ogUrl: canonical,
  title: "Juno Midwives",
  description:
    "Juno Midwives are NMC registered, independent midwives, with over 22 years combined experience and a passion for providing personalised midwifery care",
  ogTitle: "Juno Midwives",
  ogDescription: "Independent Midwives in Kent",
  ogImage: "https://junomidwives.co.uk/og-image.png",
});
</script>
