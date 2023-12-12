<script setup lang="ts">
import type { ResolvedCategory } from "../composables"

const props = withDefaults(
  defineProps<{
    data: ResolvedCategory[]
    depth?: number
  }>(),
  { depth: 0 }
)
</script>

<template>
  <template v-for="(c, i) in props.data">
    <span
      class="underline cursor-pointer transition-colors hover:text-primary-500"
      :title="c.raw"
      >{{ c.title }}</span
    >

    <template v-if="c.children.length">
      <span class="px-1">></span>

      <Categories :data="c.children" :depth="props.depth + 1" />
    </template>

    <template v-if="i < props.data.length - 1">
      <span v-if="props.depth === 0" class="px-1">/</span>
      <span v-else-if="props.depth === 1">, </span>
      <span v-else-if="props.depth === 2" class="pr-1">, </span>
      <span v-else class="pr-2">, </span>
    </template>
  </template>
</template>
