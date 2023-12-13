import { createContentLoader } from "vitepress"
import { Layout, resolveLayout } from "./frontmatter"

type Data = {
  home: string | null
  archives: string | null
  categories: string | null
  tags: string | null
  about: string | null
}

export declare const data: Data

export default createContentLoader("**/*.md", {
  transform: (data): Data => {
    const layouts = new Map<Layout, string>()
    for (const a of data) {
      layouts.set(resolveLayout(a.frontmatter), a.url)
    }

    return {
      home: layouts.get(Layout.home) ?? null,
      archives: layouts.get(Layout.archives) ?? null,
      categories: layouts.get(Layout.catagories) ?? null,
      tags: layouts.get(Layout.tags) ?? null,
      about: layouts.get(Layout.about) ?? null,
    }
  },
})
