<script lang="ts" setup>
import { useRouter } from "vitepress"
import { computed } from "vue"
import Ghost from "./components/Ghost.vue"
import { useConfig } from "./config/runtime"

const router = useRouter()
const config = useConfig()

const message = computed(() => selectRandomOne(config.value.notFound))
const backToHome = computed(() => selectRandomOne(config.value.backToHome))

function handleBackToHome() {
  router.go("/")
}

function selectRandomOne(items: string | string[]) {
  if (typeof items === "string") {
    return items
  } else {
    return items[Math.floor(Math.random() * items.length)]
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="flex justify-center items-center m-20 pb-64">
      <Ghost />

      <div class="not-found__info flex flex-col items-start">
        <h1 class="text-8xl text-primary-500">404</h1>

        <h2 class="text-gray-400 border-l-4 my-4 p-1 pl-4">
          {{ message }}
        </h2>

        <a
          class="cursor-pointer text-primary-500 font-bold hover:underline"
          @click="handleBackToHome"
        >
          {{ backToHome }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.not-found__info {
  min-width: 30rem;
}
</style>
