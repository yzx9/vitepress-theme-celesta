<template>
  <div
    class="flex flex-col items-center m-4 py-4 text-gray-400 text-sm select-none"
  >
    <span>{{ copyright }}</span>
    <span
      >Powered by
      <a href="https://vitepress.dev/" target="_blank" class="underline"
        >Vitepress</a
      ></span
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useConfig } from "../config/runtime"
import { data as postsEarliest } from "../postsEarliest.data"

const data = useConfig()

const startYear = new Date(postsEarliest.createdAt).getFullYear()
const currentYear = new Date(Date.now()).getFullYear()

const copyrightTemplate = "Copyright © :start_year – :current_year :author"
const copyright = computed(() =>
  copyrightTemplate
    .replace(":start_year", startYear.toString())
    .replace(":current_year", currentYear.toString())
    .replace(":author", data.value.author ?? "")
)
</script>
