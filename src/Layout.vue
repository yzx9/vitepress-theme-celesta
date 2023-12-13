<script setup lang="ts">
import { useData } from "vitepress"
import { provide, ref, watch } from "vue"
import About from "./About.vue"
import Home from "./Home.vue"
import NotFound from "./NotFound.vue"
import Page from "./Page.vue"
import { KEY_I18N, switchI18n } from "./i18n"

const { page, frontmatter, localeIndex } = useData()

const i18n = ref(switchI18n(localeIndex.value))
watch(localeIndex, (locale) => (i18n.value = switchI18n(locale)))
provide(KEY_I18N, i18n)
</script>

<template>
  <NotFound v-if="page.isNotFound" />

  <Home v-else-if="frontmatter.layout === 'home'" />

  <About v-else-if="frontmatter.layout === 'about'" />

  <Page v-else />
</template>
