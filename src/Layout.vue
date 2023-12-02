<script setup lang="ts">
import { useData } from "vitepress"
import Home from "./Home.vue"
import NotFound from "./NotFound.vue"
import Page from "./Page.vue"

const { page, frontmatter } = useData()
</script>

<template>
  <NotFound v-if="page.isNotFound" />
  <Home v-else-if="frontmatter.layout === 'home'" />
  <Page v-else />
</template>
