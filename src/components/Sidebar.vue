<script setup lang="ts">
import { useData } from "vitepress"

const { page } = useData()
</script>

<template>
  <section class="p-4 ml-8 mt-12">
    <div class="pb-1 text-lg font-bold">Sidebar</div>

    <div>{{ page }}</div>
  </section>
</template>
