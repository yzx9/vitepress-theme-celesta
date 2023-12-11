<script setup lang="ts">
import { useData } from "vitepress"
import LayoutBase from "./components/LayoutBase.vue"
import Posts from "./components/Posts.vue"
import { data } from "./timeline.data"

const { site } = useData()
</script>

<template>
  <LayoutBase class="home">
    <template #header>
      <div
        class="flex flex-col h-screen pb-12 justify-center items-center relative overflow-hidden"
      >
        <h1 class="home__title text-8xl text-primary-800 pb-10 z-30">
          {{ site.title }}
        </h1>

        <h2 class="text-4xl text-primary-800 z-30">
          {{ site.description }}
        </h2>
      </div>
    </template>

    <template #main>
      <Posts class="-mt-20" :posts="data.sorted" />
    </template>
  </LayoutBase>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap");

.home {
  --header-height: 100vh;
  --bg-opacity: 0;
}

.home__title {
  font-family: "Kaushan Script", cursive;
}

.home .navbar__link-home {
  display: none;
}
</style>
./timeline.data
