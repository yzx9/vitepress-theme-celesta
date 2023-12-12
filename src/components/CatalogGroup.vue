<script setup lang="ts">
import { type Header } from "vitepress"
import CatalogItem from "./CatalogItem.vue"

const props = defineProps<{
  headers: Header[]
}>()
</script>

<template>
  <ul v-if="props.headers?.length">
    <CatalogItem v-for="header in props.headers" :header="header" />
  </ul>
</template>
