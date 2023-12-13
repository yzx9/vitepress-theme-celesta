<script setup lang="ts">
import { useData, useRoute, useRouter } from "vitepress"
import { computed } from "vue"
import { useI18n } from "../i18n"

const route = useRoute()
const router = useRouter()
const { site } = useData()
const i18n = useI18n()

// links
const links = computed(() => [
  [
    {
      id: "home",
      name: site.value.title.toUpperCase(),
      link: "/",
      active: route.path === "",
      bold: true,
    },
  ],
  ["archives", "categories", "tags", "about"].map((id) => ({
    id,
    name: parseName(id),
    link: `/${id}.html`,
    active: route.path.startsWith(id),
    bold: false,
  })),
])

function handleNav(path: string) {
  router.go(path)
}

function parseName(id: string): string {
  switch (id) {
    case "archives":
      return i18n.value.archives

    case "categories":
      return i18n.value.categories

    case "tags":
      return i18n.value.tags

    case "about":
      return i18n.value.about

    default:
      return id.toUpperCase()
  }
}
</script>

<template>
  <div
    class="navbar absolute top-0 left-0 w-full flex justify-between z-50 transition-all"
  >
    <ul v-for="ls in links" class="flex">
      <li
        v-for="{ id, name, link, active, bold } in ls"
        :key="`v-navbar-link-${id}`"
        class="navbar__link flex justify-center items-center transition-all font-medium"
        :class="
          active
            ? `navbar__link-${id} navbar__link--active`
            : `navbar__link-${id}`
        "
      >
        <a
          class="h-full px-4 align-middle cursor-pointer"
          :class="{ 'font-bold': bold }"
          @click="handleNav(link)"
          >{{ name }}</a
        >
      </li>
    </ul>
  </div>
</template>

<style>
.navbar {
  --navbar-height: 50px;

  height: var(--navbar-height);
  color: rgb(var(--color-navbar, var(--color-primary-600)));
}

.navbar__link a {
  border-bottom: 2px solid transparent;
  line-height: var(--navbar-height);
}

.navbar__link--active:hover,
.navbar__link:hover {
  color: rgb(var(--color-primary-500));
}

.navbar__link--active:hover a,
.navbar__link:hover a {
  border-color: rgb(var(--color-primary-500));
}
</style>
