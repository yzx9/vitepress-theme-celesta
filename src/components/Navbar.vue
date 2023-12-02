<script setup lang="ts">
import { useData, useRoute, useRouter } from "vitepress"
import { computed, ref, watch } from "vue"
import { useScroll } from "../composables"

const route = useRoute()
const router = useRouter()
const { site } = useData()

// links
const linksBase = ["archives", "categories", "tags", "about"]
const links = computed(() =>
  linksBase.map((a) => ({
    name: a.toUpperCase(),
    link: `/${a}.html`,
    active: route.path.startsWith("/archives"),
  }))
)

// title
const isHome = computed(() => route.data.frontmatter?.layout === "home")
const title = computed(() =>
  isHome.value ? "BLOG" : site.value.title.toUpperCase()
)

// display
const NAVBAR_HEIGHT = 50
const THRESHOLD = NAVBAR_HEIGHT * 3

const { top: scrollTop } = useScroll()
const isTransparent = computed(() => scrollTop.value <= THRESHOLD)

const top = ref(0)
const createBetween = (min: number, max: number) => (val: number) =>
  val < min ? min : val > max ? max : val
const between = createBetween(-NAVBAR_HEIGHT, 0)
watch(scrollTop, (value, oldValue) => {
  top.value = between(top.value + oldValue - value)
})

function handleNav(path: string) {
  router.go(path)
}
</script>

<template>
  <div
    class="navbar fixed top-0 left-0 w-full flex justify-between z-50 bg-white bg-opacity-70 shadow-md transition-all duration-500"
    :class="{ 'navbar--transparent bg-opacity-0 shadow-none': isTransparent }"
  >
    <ul class="flex">
      <li
        class="navbar__link flex justify-center items-center transition-all font-medium text-primary-500"
      >
        <a
          class="font-bold h-full px-4 align-middle cursor-pointer transition-all"
          @click="handleNav('/')"
          >{{ title }}</a
        >
      </li>
    </ul>

    <ul class="flex">
      <li
        v-for="{ name, link, active } in links"
        :key="`v-navbar-link-${link}`"
        class="navbar__link"
        :class="{ 'text-primary-500': active }"
      >
        <a
          class="h-full px-4 align-middle cursor-pointer transition-all"
          @click="handleNav(link)"
          >{{ name }}</a
        >
      </li>
    </ul>
  </div>
</template>

<style lang="postcss">
.navbar {
  --navbar-height: calc(v-bind(NAVBAR_HEIGHT) * 1px);

  height: var(--navbar-height);
  top: calc(v-bind(top) * 1px);
}

.navbar--transparent .navbar__link {
  color: white;
}

.navbar--transparent .navbar__link:hover a {
  border-color: rgb(var(--color-primary-500));
}

.navbar__link a {
  border-bottom: 2px solid transparent;
  line-height: var(--navbar-height);
}
</style>
