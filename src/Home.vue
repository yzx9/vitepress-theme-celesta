<script setup lang="ts">
import { data as posts } from "./posts.data"

const content = JSON.stringify(posts, undefined, 2)
console.log(content)
</script>

<template>
  <h1>Home</h1>

  <p v-for="a in posts">{{ JSON.stringify(a, undefined, 2) }}</p>
</template>
