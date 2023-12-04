---
tags:
  - docs
categories:
  - [cat_1, cat_1_1]
  - [cat_2, [cat_2_1, cat_2_2]]
---

# Getting Started

1. Read [Vitepress Docs](https://vitepress.dev/guide/getting-started) and install `vitepress`

2. Install `vitepress-theme-celesta`

::: code-group

```sh [npm]
$ npm add -D vitepress-theme-celesta
```

```sh [pnpm]
$ pnpm add -D vitepress-theme-celesta
```

```sh [yarn]
$ yarn add -D vitepress-theme-celesta
```

```sh [bun]
$ bun add -D vitepress-theme-celesta
```

:::

3. Modify your `.vitepress/theme/index.ts` file.

```ts
// .vitepress/theme/index.ts
import { theme } from "vitepress-theme-celesta"

export default theme
```

# Vitepress Runtime API

The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).

# Markdown Extension Syntax

This section demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shikiji](https://github.com/antfu/shikiji), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
