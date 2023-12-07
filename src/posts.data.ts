import matter from "gray-matter"
import path from "path"
import removeMarkdown from "remove-markdown"
import { createContentLoader, type ContentData } from "vitepress"
import { config } from "./config/build-time"
import {
  resolveCategories,
  resolveCreatedAt,
  resolveTags,
  type Category,
  type Tag,
} from "./frontmatter"

const reH1 = /^#+\s+(.*)$/m

export interface Post {
  url: string
  title: string
  excerpt: string
  tags: Tag[]
  categories: Category[]
  createdAt: string
}

export declare const data: Post[]

export default createContentLoader(path.join(config.postDir, "**/*.md"), {
  includeSrc: true,
  transform: (data) =>
    data
      .map(resolvePost)
      .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1)),
})

function resolvePost(data: ContentData): Post {
  return {
    url: data.url,
    title: resolveTitle(data),
    excerpt: resolveExcerpt(data),
    tags: resolveTags(data.frontmatter),
    categories: resolveCategories(data.frontmatter),
    createdAt: resolveCreatedAt(data.frontmatter),
  }
}

function resolveTitle(data: ContentData): string {
  if (data.frontmatter.title) {
    return data.frontmatter.title
  }

  const matches = data.src?.match(reH1)
  if (matches) {
    return matches[1]
  }

  return ""
}

function resolveExcerpt(data: ContentData): string {
  if (data.frontmatter.excerpt) return data.frontmatter.excerpt

  const src = data.src
  if (!src) return ""

  let content = matter(src).content

  // remove first h1
  content = content.replace(reH1, "")

  // remove content after excerptSeprator
  if (content.includes(config.excerptSeprator)) {
    content = content.slice(0, content.indexOf(config.excerptSeprator))
  }

  // TODO: handle latex, table and img

  // remove markdown
  content = removeMarkdown(content)

  const excerpt = content.trim().slice(0, config.excerptLength)
  return excerpt + "..."
}
