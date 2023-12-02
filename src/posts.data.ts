import path from "path"
import {
  createContentLoader,
  type ContentData,
  type SiteConfig,
} from "vitepress"

const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG
export const postDir = config.userConfig.themeConfig?.postDir ?? "posts"

export interface Post {
  url: string
  title: string
  tags: string[]
  categories: string[][]
  excerpt: string
  createdAt: string
  updatedAt: string
}

export declare const data: Post[]

export default createContentLoader(path.join(postDir, "**/*.md"), {
  excerpt: true,
  transform: (data) => data.map(resolvePost),
})

function resolvePost(data: ContentData): Post {
  // TODO: set default data if not provided
  return {
    url: data.url,
    title: data.frontmatter?.title ?? "",
    tags: data.frontmatter?.tags ?? [],
    categories: data.frontmatter?.categories ?? [],
    excerpt: data.excerpt ?? "",
    createdAt: "", // TODO
    updatedAt: "", // TODO
  }
}
