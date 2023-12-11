<template>
  <div class="flex flex-col items-center m-4 py-4 text-gray-400 text-sm">
    <span>{{ copyright }}</span>
    <span
      >Powered by
      <a href="https://vitepress.dev/" target="_blank" class="underline"
        >Vitepress</a
      >
      and
      <a
        href="https://github.com/yzx9/vitepress-theme-celesta"
        target="_blank"
        class="underline"
        >Theme Celesta</a
      >
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useConfig } from "../config/runtime"
import { data } from "../timeline.data"

const config = useConfig()

const startYear = new Date(data.earliest.createdAt).getFullYear()
const currentYear = new Date(Date.now()).getFullYear()

const copyrightTemplate = "Copyright © :start_year – :current_year :author"
const copyright = computed(() =>
  copyrightTemplate
    .replace(":start_year", startYear.toString())
    .replace(":current_year", currentYear.toString())
    .replace(":author", config.value.author ?? "")
)
</script>
