<template>
  <div>
    <h1>Blog</h1>

    <div v-for="post in posts" :key="post.slug">
      <h2>{{ post.title }}</h2>
      <p>{{ post.date }}</p>
      <v-btn
        :to="post.stem"
        color="primary"
        class="text-subtitle-1 px-2 px-md-3"
      >
        Read more
      </v-btn>
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData(() => {
  return queryCollection("blog").order("date", "DESC").all();
});

console.log(posts);
</script>
