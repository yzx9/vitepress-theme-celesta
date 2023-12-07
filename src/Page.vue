<script setup lang="ts">
import { Content } from "vitepress"
import TheCatalog from "./components/Catalog.vue"
import TheHeader from "./components/Header.vue"
import LayoutBase from "./components/LayoutBase.vue"
import TheSidebar from "./components/Sidebar.vue"
</script>

<template>
  <LayoutBase class="page">
    <template #header>
      <TheHeader />
    </template>

    <template #main>
      <article class="page__article p-10 vp-doc max-w-none">
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
.page {
  --color-page-header: 68 64 60;
  --color-navbar: var(--color-page-header);
  --color-header: var(--color-page-header);
}

.page__article a.header-anchor {
  font-size: 0.85em;
  float: left;
  margin-left: -0.87em;
  padding-right: 0.23em;
  margin-top: 0.125em;
  opacity: 0;

  color: rgb(var(--color-primary-500));
}

.page__article a.header-anchor:hover {
  text-decoration: none;
}

.page__article h1:hover .header-anchor,
.page__article h2:hover .header-anchor,
.page__article h3:hover .header-anchor,
.page__article h4:hover .header-anchor,
.page__article h5:hover .header-anchor,
.page__article h6:hover .header-anchor {
  opacity: 1;
}

.page__article img {
  margin: auto;
}
</style>
