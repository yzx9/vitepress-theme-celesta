<script setup lang="ts">
import { useRouter } from "vitepress"
import type { Post } from "../posts.data"

const props = defineProps<{
  data: Post
}>()

const router = useRouter()

function handlePostClicked(post: Post) {
  router.go(post.url)
}
</script>

<template>
  <div
    class="py-4 px-8 flex flex-col transition-all duration-300 rounded-lg items-center bg-white"
  >
    <h2 class="m-4 p-2 text-2xl text-center transition-colors">
      {{ props.data.title }}
    </h2>

    <article class="m-8 text-base text-gray-500">
      {{ props.data.excerpt }}
    </article>

    <button
      class="m-4 p-2 px-4 text-center select-none border border-solid border-gray-400 rounded-full text-gray-500 transition-all cursor-pointer hover:text-primary-500 hover:border-primary-500"
      @click="handlePostClicked(props.data)"
    >
      阅读全文
    </button>
  </div>
</template>
