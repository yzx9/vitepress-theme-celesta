<script setup lang="ts">
import { Content } from "vitepress"
import { computed } from "vue"
import LayoutBase from "./components/LayoutBase.vue"
import { useConfig, useData } from "./config/runtime"

const { frontmatter } = useData()
const config = useConfig()

const avatar = computed(() => frontmatter.value?.avatar ?? null)
</script>

<template>
  <LayoutBase class="about">
    <template #main>
      <div
        class="relative mt-24 py-4 px-8 flex flex-col transition-all duration-300 rounded-lg items-center bg-white"
      >
        <div
          v-if="avatar"
          class="absolute -top-20 w-36 h-36 rounded-full shadow overflow-hidden"
        >
          <img :src="avatar" />
        </div>

        <h1 class="mt-20 text-3xl font-bold">{{ config.author }}</h1>

        <article class="page__article p-10 vp-doc max-w-none w-full">
          <Content />
        </article>
      </div>
    </template>
  </LayoutBase>
</template>

<style>
.about {
  --header-height: 10vh;
  --bg-opacity: 0;
}
</style>
