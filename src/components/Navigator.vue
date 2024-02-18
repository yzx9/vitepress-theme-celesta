<script setup lang="ts">
import { useNavLinks } from "../composables"

const navLinks = useNavLinks()
</script>

<template>
  <div v-if="navLinks.prev || navLinks.next" class="flex justify-between my-4">
    <template
      v-for="{ link, cls } in [
        { link: navLinks.prev, cls: 'navigator__prev' },
        { link: navLinks.next, cls: 'navigator__next' },
      ]"
    >
      <div
        v-if="link"
        class="cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis underline decoration-transparent transition-colors hover:text-primary-500 hover:decoration-primary-500"
        :class="cls"
        @click="link.go"
      >
        {{ link.title }}
      </div>

      <div v-else></div>
    </template>
  </div>
</template>

<style>
.navigator__prev {
  text-align: left;
  padding-left: 2rem;
  padding-right: 0.5rem;
}

.navigator__prev::after {
  left: 0.5rem;
  border-width: 0 0 1.5px 1.5px;
}

.navigator__next {
  text-align: right;
  padding-left: 0.5rem;
  padding-right: 2rem;
}

.navigator__next::after {
  right: 0.5rem;
  border-width: 1.5px 1.5px 0 0;
}

.navigator__prev,
.navigator__next {
  position: relative;
  max-width: 40%;
}

.navigator__prev::after,
.navigator__next::after {
  display: block;
  content: "";
  position: absolute;
  top: 0.35rem;
  box-sizing: border-box;
  width: 0.75rem;
  height: 0.75rem;
  border-color: currentColor;
  border-style: solid;
  transform: rotate(45deg);
}
</style>
