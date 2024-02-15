<script setup lang="ts">
import dayjs from "dayjs"
import { computed } from "vue"
import { useCategories, useTags } from "../composables"
import { getVisiableColor } from "../composables/color"
import { useData } from "../config/runtime"
import { resolveCreatedAt, resolveUpdatedAt } from "../frontmatter"
import { useI18n } from "../i18n"
import Categories from "./Categories.vue"

const { page } = useData()
const categories = useCategories()
const tags = useTags()
const i18n = useI18n()

const createdAt = computed(() => resolveCreatedAt(page.value.frontmatter))
const updatedAtRaw = computed(() => resolveUpdatedAt(page.value.frontmatter))
const updatedAt = computed(() =>
  updatedAtRaw.value ? new Date(updatedAtRaw.value) : null
)
const updated = computed(
  () => updatedAtRaw.value && updatedAtRaw.value !== createdAt.value
)
</script>

<template>
  <div
    class="header relative h-full flex flex-col justify-center items-center px-16 overflow-hidden"
  >
    <div class="flex flex-col items-start">
      <div class="z-30 min-w-max">
        <a
          v-for="{ title, slug, raw } in tags"
          :key="`tag-${slug}`"
          class="header__pill-link mr-2 px-3 py-1 border rounded-full cursor-pointer transition-colors duration-300"
          :style="{
            '--pill-link-color': getVisiableColor(slug),
          }"
          :title="raw"
          >{{ title }}</a
        >
      </div>

      <h1 class="my-6 z-30 text-8xl font-medium">
        {{ page.title }}
      </h1>
    </div>

    <div v-if="categories.length" class="text-sm">
      <span class="pr-2">{{ i18n.classifyAt }}</span
      ><Categories :data="categories" />
    </div>

    <div v-if="updated && updatedAt && updatedAtRaw" class="text-sm">
      <span class="pr-2">{{ i18n.updatedAt }}</span
      ><span :title="updatedAtRaw">{{
        dayjs(updatedAt).format(i18n.dateFormat)
      }}</span>
    </div>
  </div>
</template>

<style>
.header {
  color: var(--color-header, black);
}

.header__pill-link {
  --pill-link-c: var(--pill-link-color, var(--color-primary-500));

  color: rgb(var(--pill-link-c));
  border-color: rgb(var(--pill-link-c));
  background-color: rgb(var(--pill-link-c) / 0.1);
}

.header__pill-link:hover {
  color: white;
  background-color: rgb(var(--pill-link-c));
}
</style>
