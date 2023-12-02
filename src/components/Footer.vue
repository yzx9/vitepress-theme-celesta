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
import { useData } from "vitepress"
import { computed } from "vue"
import type { Config } from "../config"

const data = useData<Config>()

const currentYear = new Date(Date.now()).getFullYear()

const copyrightTemplate = "Copyright © 2021 – :year :author"
const copyright = computed(() =>
  copyrightTemplate
    .replace(":year", currentYear.toString())
    .replace(":author", data.theme.value.author ?? "")
)
</script>
