<script setup lang="ts">
import { Content } from "vitepress"
import TheCatalog from "./components/Catalog.vue"
import TheHeader from "./components/Header.vue"
import LayoutBase from "./components/LayoutBase.vue"
import TheSidebar from "./components/Sidebar.vue"
</script>

<template>
  <LayoutBase>
    <template #header>
      <TheHeader />
    </template>

    <template #main>
      <article class="page p-10 vp-doc max-w-none">
        <Content />
      </article>
    </template>

    <template #sub>
      <TheSidebar />
    </template>

    <template #extra>
      <TheCatalog />
    </template>
  </LayoutBase>
</template>

<style lang="postcss">
.page a.header-anchor {
  font-size: 0.85em;
  float: left;
  margin-left: -0.87em;
  padding-right: 0.23em;
  margin-top: 0.125em;
  opacity: 0;

  color: rgb(var(--color-primary-500));

  &:hover {
    text-decoration: none;
  }
}

.page h1:hover .header-anchor,
.page h2:hover .header-anchor,
.page h3:hover .header-anchor,
.page h4:hover .header-anchor,
.page h5:hover .header-anchor,
.page h6:hover .header-anchor {
  opacity: 1;
}

.page img {
  margin: auto;
}
</style>
