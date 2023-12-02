import { type ContentData } from "vitepress"

export function resolveTitle(data: ContentData): string {
  return data.frontmatter?.title ?? ""
}

export interface Tag {
  name: string
  slug: string
}

export function resolveTags(data: ContentData): Tag[] {
  return data.frontmatter?.tags ?? []
}

export interface Category {
  name: string
  slug: string
  children: Category[]
}

export function resolveCategories(data: ContentData): Category[] {
  return data.frontmatter?.categories ?? []
}

export function resolveCreateAt(data: ContentData): string {
  const createdAt = data.frontmatter?.date
    ? new Date(data.frontmatter.date)
    : new Date(2020, 0, 1)

  return createdAt.toUTCString()
}
