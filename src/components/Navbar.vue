<script setup lang="ts">
import { useData, useRoute, useRouter } from "vitepress"
import { computed } from "vue"
import { data } from "../entry.data"
import { useI18n } from "../i18n"

const route = useRoute()
const router = useRouter()
const { site } = useData()
const i18n = useI18n()

const entries = getEntries()
const links = computed(() => [
  data.home
    ? [
        {
          id: "home",
          url: data.home,
          name: site.value.title.toUpperCase(),
          active: route.path === "",
          bold: true,
        },
      ]
    : [],
  entries.map(({ id, url }) => ({
    id,
    url,
    name: parseName(id),
    active: route.path.startsWith(url),
    bold: false,
  })),
])

function handleLinkClicked(url: string) {
  router.go(url)
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

function getEntries(): { id: string; url: string }[] {
  const arr = []
  if (data.archives) arr.push({ id: "archives", url: data.archives })
  if (data.categories) arr.push({ id: "categories", url: data.categories })
  if (data.tags) arr.push({ id: "tags", url: data.tags })
  if (data.about) arr.push({ id: "about", url: data.about })
  return arr
}
</script>

<template>
  <div
    class="navbar absolute top-0 left-0 w-full flex justify-between z-50 transition-all"
  >
    <ul v-for="ls in links" class="flex">
      <li
        v-for="{ id, url, name, active, bold } in ls"
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
          @click="handleLinkClicked(url)"
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
