<script setup lang="ts">
import { computed, ref, watch } from "vue"
import type { Post } from "../posts.data"
import Pager from "./Pager.vue"
import PostVue from "./Post.vue"

const props = defineProps<{
  data: Post[]
}>()

const root = ref<HTMLElement | null>(null)

const pager = ref({
  current: 1,
  pageSize: 10,
  total: computed(() => props.data.length),
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
  props.data.slice(
    (pager.value.current - 1) * pager.value.pageSize,
    pager.value.current * pager.value.pageSize
  )
)
</script>

<template>
  <div ref="root" class="flex flex-col gap-8">
    <PostVue v-for="post in slice" :data="post" />

    <Pager v-model:current="pager.current" :total="pager.total" />
  </div>
</template>
