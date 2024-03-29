<script setup lang="ts">
import dayjs from "dayjs"
import { Content } from "vitepress"
import { computed } from "vue"
import Catalog from "../components/Catalog.vue"
import TheHeader from "../components/Header.vue"
import LayoutBase from "../components/LayoutBase.vue"
import Navigator from "../components/Navigator.vue"
import Sidebar from "../components/Sidebar.vue"
import { useConfig, useData } from "../config/runtime"
import {
  resolveAuthor,
  resolveCreatedAt,
  resolveLocation,
} from "../frontmatter"
import { useI18n } from "../i18n"

const data = useData()
const config = useConfig()
const i18n = useI18n()

const author = computed(
  () => resolveAuthor(data.frontmatter.value) ?? config.value.author
)

const createdAtRaw = computed(() => resolveCreatedAt(data.frontmatter.value))
const createdAt = computed(() =>
  createdAtRaw.value ? new Date(createdAtRaw.value) : null
)

// TODO: translation
const location = computed(() => resolveLocation(data.frontmatter.value))
</script>

<template>
  <LayoutBase class="page">
    <template #header>
      <TheHeader />
    </template>

    <template #main>
      <article class="page__article p-10 vp-doc max-w-none">
        <Content />
      </article>

      <div class="my-8 px-10 flex flex-col items-end">
        <div class="theme-font-primary my-8 mx-4 text-2xl">
          {{ author }}
        </div>

        <div v-if="location" class="my-2 text-sm">{{ location }}</div>

        <div
          v-if="createdAt && createdAtRaw"
          class="my-2 text-sm"
          :title="createdAtRaw"
        >
          {{ dayjs(createdAt).format(i18n.dateFormat) }}
        </div>
      </div>

      <div class="w-full px-10 my-8 flex flex-col text-gray-600">
        <div class="my-4 border-t"></div>

        <Navigator />
      </div>
    </template>

    <template #sub>
      <Sidebar />
    </template>

    <template #extra>
      <Catalog />
    </template>
  </LayoutBase>
</template>

<style lang="postcss">
.page {
  --color-page-header: 68 64 60;
  --color-navbar: var(--color-page-header);
  --color-header: var(--color-page-header);
}

.page__article a.header-anchor {
  font-size: 0.85em;
  float: left;
  margin-left: -0.87em;
  padding-right: 0.23em;
  margin-top: 0.125em;
  opacity: 0;

  color: rgb(var(--color-primary-500));
}

.page__article a.header-anchor:hover {
  text-decoration: none;
}

.page__article h1:hover .header-anchor,
.page__article h2:hover .header-anchor,
.page__article h3:hover .header-anchor,
.page__article h4:hover .header-anchor,
.page__article h5:hover .header-anchor,
.page__article h6:hover .header-anchor {
  opacity: 1;
}

.page__article img {
  margin: auto;
}
</style>
