import path from "path"
import { createContentLoader } from "vitepress"
import { config } from "./config/build-time"
import { parseCategorySlug, resolveCategories } from "./frontmatter"
import { resloveContentDataCreatedAt } from "./timeline.data"

type CategoryNodes = {
  [slug: string]: CategoryNodes
}

type Data = {
  roots: CategoryNodes

  /**
   * Map from slug to post url
   */
  posts: Record<string, string[]>
}

export declare const data: Data

export default createContentLoader(path.join(config.postDir, "**/*.md"), {
  transform(data): Data {
    const { timeline } = resloveContentDataCreatedAt(data)
    const postsRaw = timeline.map((a) => ({
      url: a.url,
      categories: resolveCategories(a.frontmatter),
    }))

    const roots: CategoryNodes = {}
    for (const c in postsRaw.map((a) => a.categories).flat()) {
      let current: CategoryNodes = roots
      for (const cc in parseCategorySlug(c).parts) {
        if (!current[cc]) current[cc] = {}
        current = current[cc]
      }
    }

    const posts: Data["posts"] = {}
    for (const post of postsRaw) {
      for (const catgory of post.categories) {
        for (const ancestor of parseCategorySlug(catgory.slug).ancestors) {
          if (!posts[ancestor]) posts[ancestor] = []
          if (!posts[ancestor].includes(post.url))
            posts[ancestor].push(post.url)
        }
      }
    }

    return {
      roots,
      posts,
    }
  },
})
