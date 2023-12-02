import path from "path"
import {
  createContentLoader,
  type ContentData,
  type SiteConfig,
} from "vitepress"
import {
  resolveCreateAt,
  resolveTags,
  resolveTitle,
  type Category,
  type Tag,
} from "./frontmatter"

const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG
export const postDir = config.userConfig.themeConfig?.postDir ?? "posts"

export interface Post {
  url: string
  title: string
  tags: Tag[]
  categories: Category[]
  excerpt: string
  createdAt: string
}

export declare const data: Post[]

export default createContentLoader(path.join(postDir, "**/*.md"), {
  excerpt: true,
  transform: (data) =>
    data
      .map(resolvePost)
      .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1)),
})

function resolvePost(data: ContentData): Post {
  return {
    url: data.url,
    title: resolveTitle(data),
    tags: resolveTags(data),
    categories: data.frontmatter?.categories ?? [],
    excerpt: resolveExcerpt(data),
    createdAt: resolveCreateAt(data),
  }
}

function resolveExcerpt(data: ContentData): string {
  // TODO
  return data?.excerpt ?? ""
}
