<script setup lang="ts">
import { useRouter } from "vitepress"
import { type Post } from "../posts.data"

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
    class="p-8 flex flex-col transition-all duration-300 rounded-lg items-center bg-white"
  >
    <h2 class="mb-2 p-2 text-2xl transition-colors">
      {{ props.data.title }}
    </h2>

    <article
      v-html="props.data.excerpt"
      class="vp-doc text-base text-gray-500"
    ></article>

    <button
      class="mt-6 p-2 px-4 text-center select-none border rounded-full transition-colors cursor-pointer hover:text-white hover:border-primary-500 hover:bg-primary-500"
      @click="handlePostClicked(props.data)"
    >
      阅读全文
    </button>
  </div>
</template>
