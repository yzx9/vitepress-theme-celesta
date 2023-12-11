<script setup lang="ts">
import { useRouter } from "vitepress"
import { computed } from "vue"
import type { Post } from "../posts.data"
import { data } from "../posts.data"

const props = defineProps<{
  post: string
}>()

const router = useRouter()

// TODO: dynamic loading
const post = computed<Post>(() => data.posts[props.post])

function handlePostClicked() {
  router.go(post.value.url)
}
</script>

<template>
  <div
    class="py-4 px-8 flex flex-col transition-all duration-300 rounded-lg items-center bg-white"
  >
    <h2 class="m-4 p-2 text-2xl text-center transition-colors">
      {{ post.title }}
    </h2>

    <article class="m-8 text-base text-gray-500">
      {{ post.excerpt }}
    </article>

    <button
      class="m-4 p-2 px-4 text-center select-none border border-solid border-gray-400 rounded-full text-gray-500 transition-all cursor-pointer hover:text-primary-500 hover:border-primary-500"
      @click="handlePostClicked()"
    >
      阅读全文
    </button>
  </div>
</template>
