<script setup lang="ts">
import { useData } from "vitepress"
import { computed, provide, ref, watch } from "vue"
import About from "./About.vue"
import Archives from "./Archives.vue"
import Categories from "./Categories.vue"
import Home from "./Home.vue"
import NotFound from "./NotFound.vue"
import Page from "./Page.vue"
import Tags from "./Tags.vue"
import { Layout, resolveLayout } from "./frontmatter"
import { KEY_I18N, switchI18n } from "./i18n"

const { page, frontmatter, localeIndex } = useData()

const layout = computed(() => resolveLayout(frontmatter.value))

const i18n = ref(switchI18n(localeIndex.value))
watch(localeIndex, (locale) => (i18n.value = switchI18n(locale)))
provide(KEY_I18N, i18n)
</script>

<template>
  <NotFound v-if="page.isNotFound" />

  <Home v-else-if="layout === Layout.home" />

  <Archives v-else-if="layout === Layout.archives" />

  <Categories v-else-if="layout === Layout.catagories" />

  <Tags v-else-if="layout === Layout.tags" />

  <About v-else-if="layout === Layout.about" />

  <Page v-else />
</template>
