<script lang="ts">
import type { InjectionKey } from "vue"

export const KEY_ACTIVE_ANCHOR: InjectionKey<Ref<string | null>> = Symbol()
</script>

<script setup lang="ts">
import { debounce } from "ts-debounce"
import { onMounted, onUnmounted, onUpdated, provide, ref, type Ref } from "vue"
import { useData } from "../config/runtime"
import CatalogGroup from "./CatalogGroup.vue"

// magic number to avoid repeated retrieval
const PAGE_OFFSET = 71

const { page } = useData()
const activeHeader = ref<string | null>(null)
provide(KEY_ACTIVE_ANCHOR, activeHeader)

const onScroll = debounce(setActiveLink, 100)
onMounted(() => {
  requestAnimationFrame(setActiveLink)
  window.addEventListener("scroll", () => onScroll())
})

onUpdated(() => {
  // sidebar update means a route change
  activateLink(location.hash)
})

onUnmounted(() => {
  window.removeEventListener("scroll", () => onScroll())
})

function activateLink(hash: string | null) {
  activeHeader.value = hash && decodeURIComponent(hash)
}

function setActiveLink() {
  const anchors = Array.from(
    window.document.querySelectorAll(".page a.header-anchor")
  ) as HTMLAnchorElement[]

  const scrollY = window.scrollY
  const innerHeight = window.innerHeight
  const offsetHeight = document.body.offsetHeight
  const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1

  // page bottom - highlight last one
  if (anchors.length && isBottom) {
    const anchor = anchors[anchors.length - 1]
    activateLink(anchor.hash)
    return
  }

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i]
    const nextAnchor = i + 1 < anchors.length ? anchors[i + 1] : null

    const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor)
    if (isActive) {
      activateLink(hash)
      return
    }
  }
}

function isAnchorActive(
  index: number,
  anchor: HTMLAnchorElement,
  nextAnchor: HTMLAnchorElement | null
): [boolean, string | null] {
  const scrollTop = window.scrollY

  if (index === 0 && scrollTop === 0) {
    return [true, null]
  }

  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null]
  }

  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
    return [true, anchor.hash]
  }

  return [false, null]
}

function getAnchorTop(anchor: HTMLAnchorElement): number {
  return anchor.parentElement!.offsetTop - PAGE_OFFSET
}
</script>

<template>
  <section class="sticky top-12 p-4 mr-8">
    <template v-if="page.headers?.length">
      <h3 class="pb-1 font-bold">On this page</h3>

      <CatalogGroup :headers="page.headers" />
    </template>
  </section>
</template>
