<script setup lang="ts">
import { useData } from "../config/runtime"

const { page } = useData()
</script>

<template>
  <div
    class="header h-full flex flex-col justify-center items-center relative overflow-hidden"
  >
    <div class="flex flex-col items-start">
      <h1 class="my-6 z-30 text-8xl font-medium">
        {{ page.title }}
      </h1>
    </div>
  </div>
</template>

<style>
.header {
  color: var(--color-header, black);
}
</style>
