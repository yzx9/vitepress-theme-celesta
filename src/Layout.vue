<script setup lang="ts">
import { computed, provide, ref, watch } from "vue"
import { useData } from "./config/runtime"
import { Layout, resolveLayout } from "./frontmatter"
import { KEY_I18N, switchI18n } from "./i18n"
import About from "./layouts/About.vue"
import Archives from "./layouts/Archives.vue"
import Categories from "./layouts/Categories.vue"
import Home from "./layouts/Home.vue"
import NotFound from "./layouts/NotFound.vue"
import Page from "./layouts/Page.vue"
import Tags from "./layouts/Tags.vue"
// const About = defineAsyncComponent(() => import("./layouts/About.vue"))
// const Archives = defineAsyncComponent(() => import("./layouts/Archives.vue"))
// const Categories = defineAsyncComponent(
//   () => import("./layouts/Categories.vue")
// )
// const Home = defineAsyncComponent(() => import("./layouts/Home.vue"))
// const NotFound = defineAsyncComponent(() => import("./layouts/NotFound.vue"))
// const Page = defineAsyncComponent(() => import("./layouts/Page.vue"))
// const Tags = defineAsyncComponent(() => import("./layouts/Tags.vue"))

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
