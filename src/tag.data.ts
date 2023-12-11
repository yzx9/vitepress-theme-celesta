import path from "path"
import { createContentLoader } from "vitepress"
import { config } from "./config/build-time"
import { resolveTags } from "./frontmatter"
import { resloveContentDataCreatedAt } from "./timeline.data"

type Data = {
  /**
   * Map from slug to post url
   */
  posts: Record<string, string[]>
}

export declare const data: Data

export default createContentLoader(path.join(config.postDir, "**/*.md"), {
  transform: (data): Data => {
    const { timeline } = resloveContentDataCreatedAt(data)
    const postsRaw = timeline.map((a) => ({
      url: a.url,
      tags: resolveTags(a.frontmatter),
    }))

    const posts: Data["posts"] = {}
    for (const post of postsRaw) {
      for (const tag of post.tags) {
        if (!posts[tag.slug]) posts[tag.slug] = []
        posts[tag.slug].push(post.url)
      }
    }

    return {
      posts,
    }
  },
})
