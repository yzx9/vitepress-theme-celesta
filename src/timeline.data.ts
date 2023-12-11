import path from "path"
import { createContentLoader, type ContentData } from "vitepress"
import { config } from "./config/build-time"
import { resolveCreatedAt } from "./frontmatter"

type Data = {
  /**
   * Sorted post urls by createdAt desc
   */
  timeline: string[]

  earliest: {
    createdAt: string
  }
}

export declare const data: Data

export default createContentLoader(path.join(config.postDir, "**/*.md"), {
  includeSrc: true,
  transform(data): Data {
    const { timeline, resolved } = resloveContentDataCreatedAt(data)
    const earliest = resolved?.[resolved.length - 1] ?? {
      createdAt: new Date(),
    }
    return {
      timeline: timeline.map((a) => a.url),
      earliest: {
        createdAt: earliest.createdAt.toISOString(),
      },
    }
  },
})

export function resloveContentDataCreatedAt(data: ContentData[]): {
  /**
   * Sorted posts by createdAt desc, unresolved posts are at the end
   */
  timeline: ContentData[]

  /**
   * Resolved posts, sotred by createdAt desc
   */
  resolved: {
    createdAt: Date
    data: ContentData
  }[]

  /**
   * Unresolved posts
   */
  unresolved: ContentData[]
} {
  const tryResovle = data.map((a) => ({
    createdAt: resolveCreatedAt(a.frontmatter),
    data: a,
  }))

  const resolved = tryResovle
    .filter((a) => a.createdAt)
    .map((a) => ({
      createdAt: new Date(a.createdAt!),
      data: a.data,
    }))
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))

  const unresolved = tryResovle.filter((a) => !a.createdAt).map((a) => a.data)
  const timeline = resolved.map((a) => a.data).concat(unresolved)
  return { timeline, resolved, unresolved }
}
