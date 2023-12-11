import path from "path"
import { createContentLoader, type ContentData } from "vitepress"
import { config } from "./config/build-time"
import { DateDefault, resolveCreatedAt } from "./frontmatter"

type Data = {
  /**
   * Sorted post urls by createdAt desc
   */
  sorted: string[]

  earliest: {
    createdAt: string
  }
}

export declare const data: Data

export default createContentLoader(path.join(config.postDir, "**/*.md"), {
  includeSrc: true,
  transform(data): Data {
    const { sorted, resolved } = resloveContentDataCreatedAt(data)
    const earliest = resolved?.[resolved.length - 1] ?? {
      createdAt: new Date(),
    }
    return {
      sorted: sorted.map((a) => a.url),
      earliest: {
        createdAt: earliest.createdAt.toISOString(),
      },
    }
  },
})

export function resloveContentDataCreatedAt(data: ContentData[]): {
  /**
   * Sorted post urls by createdAt desc, unresolved posts are at the end
   */
  sorted: ContentData[]

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
    .filter((a) => a.createdAt !== DateDefault)
    .map((a) => ({
      createdAt: new Date(a.createdAt),
      data: a.data,
    }))
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))

  const unresolved = tryResovle
    .filter((a) => a.createdAt === DateDefault)
    .map((a) => a.data)

  const sorted = resolved.map((a) => a.data).concat(unresolved)
  return { sorted, resolved, unresolved }
}
