<script setup lang="ts">
import { useRouter, type Header } from "vitepress"
import { computed, inject, ref } from "vue"
import { useConfig } from "../config/runtime"
import { KEY_ACTIVE_ANCHOR } from "./Catalog.vue"
import CatalogGroup from "./CatalogGroup.vue"

const props = defineProps<{
  header: Header
}>()

const router = useRouter()
const config = useConfig()

const activeAnchor = inject(KEY_ACTIVE_ANCHOR, ref(null))

const active = computed(() => isActive(props.header))
const expand = computed(
  () =>
    props.header.level < config.value.catalogExpandedLessThan || active.value
)

function handleClick() {
  router.go(router.route.path + props.header.link)
}

function isActive(header: Header): boolean {
  return header.link === activeAnchor.value || header.children.some(isActive)
}
</script>

<template>
  <li
    class="catalog__item p-1 pl-2 border-l transition-colors duration-300"
    :class="{
      'catalog__item--active border-l border-primary-300': active,
      'catalog__item--expand': expand,
    }"
  >
    <a
      class="catalog__link text-gray-500 hover:text-primary-500 cursor-pointer transition-colors duration-300"
      @click="handleClick"
      >{{ props.header.title }}</a
    >

    <CatalogGroup v-if="expand" class="pl-4" :headers="props.header.children" />
  </li>
</template>

<style lang="postcss">
.catalog__item .catalog__item {
  border-color: transparent;
}

.catalog__item--active .catalog__item {
  border-color: transparent;
}

.catalog__item--active > .catalog__link {
  color: rgb(var(--color-primary-500));
}
</style>
