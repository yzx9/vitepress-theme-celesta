<script setup lang="ts">
import { computed, ref, watch } from "vue"
import Pager from "./Pager.vue"
import PostCard from "./PostCard.vue"

const props = defineProps<{
  posts: string[]
}>()

const root = ref<HTMLElement | null>(null)

const pager = ref({
  current: 1,
  pageSize: 10,
  total: computed(() => props.posts.length),
})
watch(
  () => pager.value.total,
  () => (pager.value.current = 0)
)

watch(
  () => pager.value.current,
  () => window.scrollTo(0, root.value?.offsetTop ?? 0)
)

const slice = computed(() =>
  props.posts.slice(
    (pager.value.current - 1) * pager.value.pageSize,
    pager.value.current * pager.value.pageSize
  )
)
</script>

<template>
  <div ref="root" class="flex flex-col gap-8">
    <PostCard v-for="post in slice" :post="post" />

    <Pager v-model:current="pager.current" :total="pager.total" />
  </div>
</template>
