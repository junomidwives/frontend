<template>
  <section v-if="displayPosts.length" class="posts">
    <h2 v-if="heading" class="posts__heading">{{ heading }}</h2>

    <!-- Wide screens, birth stories: one large story beside the others. -->
    <div v-if="featured" class="posts__feature">
      <nuxt-link :to="linkFor(displayPosts[0])" class="posts__lead">
        <img
          v-if="displayPosts[0].image"
          :src="imageFor(displayPosts[0], 900)"
          alt=""
          class="posts__lead-img"
          loading="lazy"
          decoding="async"
        />
        <span v-else class="posts__lead-img posts__placeholder"></span>
        <strong class="posts__lead-title">{{ displayPosts[0].title }}</strong>
        <span class="posts__more">Read more</span>
      </nuxt-link>

      <div v-if="displayPosts.length > 1" class="posts__side">
        <nuxt-link
          v-for="post in displayPosts.slice(1)"
          :key="post._id"
          :to="linkFor(post)"
          class="posts__side-item"
        >
          <img
            v-if="post.image"
            :src="imageFor(post, 600)"
            alt=""
            class="posts__side-img"
            loading="lazy"
            decoding="async"
          />
          <span v-else class="posts__side-img posts__placeholder"></span>
          <strong class="posts__side-title">{{ post.title }}</strong>
          <span class="posts__more">Read more</span>
        </nuxt-link>
      </div>
    </div>

    <!-- The list: blog posts on wide screens, and every type below 961px. -->
    <div class="posts__list" :class="{ 'posts__list--compact-only': featured }">
      <nuxt-link v-for="post in displayPosts" :key="post._id" :to="linkFor(post)" class="posts__row">
        <img
          v-if="post.image"
          :src="imageFor(post, 400)"
          alt=""
          class="posts__thumb"
          loading="lazy"
          decoding="async"
        />
        <span v-else class="posts__thumb posts__placeholder"></span>
        <strong class="posts__row-title">{{ post.title }}</strong>
        <span class="posts__row-more">
          <span class="posts__row-more-text">Read more</span>
          <v-icon icon="mdi-arrow-right" size="20" />
        </span>
      </nuxt-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const props = defineProps({
  heading: {
    type: String,
    default: "",
  },
  postType: {
    type: String,
    default: "blog",
  },
  posts: {
    type: Array as () => SanityDocument[],
    default: () => [],
  },
  birthStoryPosts: {
    type: Array as () => SanityDocument[],
    default: () => [],
  },
  fallbackPosts: {
    type: Array as () => SanityDocument[],
    default: () => [],
  },
});

const { $urlFor } = useNuxtApp();

const postBasePath = computed(() =>
  props.postType === "birthStory" ? "/birth-stories" : "/blog",
);

const selectedPosts = computed(() =>
  props.postType === "birthStory" ? props.birthStoryPosts : props.posts,
);

const displayPosts = computed(
  () =>
    (selectedPosts.value?.length ? selectedPosts.value : props.fallbackPosts)?.filter(Boolean) ?? [],
);

// Birth stories get the featured layout on wide screens; blog posts are a list.
const featured = computed(() => props.postType === "birthStory");

const linkFor = (post: SanityDocument) => `${postBasePath.value}/${post.slug?.current}`;
const imageFor = (post: SanityDocument, width: number) =>
  ($urlFor as any)(post.image).width(width).auto("format").url();
</script>

<style>
.posts {
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: 8px;
}

.content .posts__heading,
.posts__heading {
  margin: 0 0 32px;
}

.posts__placeholder {
  display: block;
  background: rgb(var(--v-theme-tint));
}

.posts__more {
  font-size: 1rem;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* Featured (birth stories, 961px and up) */
.posts__feature {
  display: flex;
  gap: 32px;
}

.posts__lead,
.posts__side-item {
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: rgb(var(--v-theme-ink));
  text-decoration: none;
}

.posts__lead {
  flex: 2 1 0;
}

.posts__side {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.posts__lead-img,
.posts__side-img {
  width: 100%;
  object-fit: cover;
}

.posts__lead-img {
  aspect-ratio: 4 / 3;
  border-radius: 20px;
}

.posts__side-img {
  aspect-ratio: 16 / 10;
  border-radius: 16px;
}

.posts__lead-title {
  font-size: 1.625rem;
  line-height: 1.25;
}

.posts__side-title {
  font-size: 1.1875rem;
  line-height: 1.3;
}

/* List */
.posts__list {
  display: flex;
  flex-direction: column;
}

.posts__list--compact-only {
  display: none;
}

.posts__row {
  display: flex;
  align-items: center;
  gap: 16px 32px;
  padding: 24px 0;
  border-top: 1px solid rgb(var(--v-theme-line));
  color: rgb(var(--v-theme-ink));
  text-decoration: none;
}

.posts__row:last-child {
  border-bottom: 1px solid rgb(var(--v-theme-line));
}

.posts__thumb {
  flex: none;
  width: 160px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 14px;
}

.posts__row-title {
  flex: 1 1 auto;
  min-width: 0;
  font-size: 1.375rem;
  line-height: 1.3;
}

.posts__row-more {
  flex: none;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
}

.posts__row:hover .posts__row-title,
.posts__lead:hover .posts__lead-title,
.posts__side-item:hover .posts__side-title {
  color: rgb(var(--v-theme-primary));
}

/* Below 961px: compact rows for every post type. */
@media (max-width: 960px) {
  .posts__feature {
    display: none;
  }

  .posts__list--compact-only {
    display: flex;
  }

  .posts__row {
    gap: 16px 24px;
    padding: 20px 0;
  }

  .posts__thumb {
    width: 120px;
    border-radius: 12px;
  }

  .posts__row-title {
    font-size: 1.1875rem;
  }

  .posts__row-more-text {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
}

@media (max-width: 700px) {
  .posts__row {
    gap: 16px;
    padding: 16px 0;
  }

  .posts__thumb {
    width: 96px;
  }

  .posts__row-title {
    font-size: 1.0625rem;
  }
}
</style>
