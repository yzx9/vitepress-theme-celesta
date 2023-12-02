<script setup lang="ts">
import TheFooter from "./Footer.vue"
import HeroPattern from "./HeroPattern.vue"
import TheNavbar from "./Navbar.vue"
</script>

<template>
  <div class="layout">
    <main class="layout__main">
      <slot name="main"></slot>
    </main>

    <aside class="layout__sub">
      <slot name="sub"></slot>
    </aside>

    <aside class="layout__extra">
      <slot name="extra"></slot>
    </aside>

    <header class="layout__header">
      <slot name="header"></slot>
    </header>

    <footer class="layout__footer">
      <slot name="footer">
        <TheFooter />
      </slot>
    </footer>

    <nav class="layout__nav overflow-hidden z-50">
      <slot name="nav">
        <TheNavbar />
      </slot>
    </nav>

    <ClientOnly>
      <HeroPattern class="layout__background" />
    </ClientOnly>
  </div>
</template>

<style>
.layout {
  position: relative;
  display: grid;
  grid:
    "header header header" var(--header-height)
    "sub    main   extra " auto
    "footer footer footer" auto
    / 1fr var(--main-width) 1fr;
  min-height: 100vh;
  z-index: 10;
}

.layout__main {
  grid-area: main;
  background-color: rgb(var(--bg-color) / var(--bg-opacity));
  z-index: 30;
}

.layout__sub {
  grid-area: sub;
  background-color: rgb(var(--bg-color) / var(--bg-opacity));
}

.layout__extra {
  grid-area: extra;
  background-color: rgb(var(--bg-color) / var(--bg-opacity));
}

.layout__header {
  grid-area: header;
}

.layout__footer {
  grid-area: footer;
  background-color: rgb(var(--bg-color) / var(--bg-opacity));
}

.layout__nav {
  z-index: 50;
}

.layout__background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
}
</style>
