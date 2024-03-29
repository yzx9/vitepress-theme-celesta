import { slugFriendly } from "./config/cross-time"

type Frontmatter = Record<string, any>

/**
 * Tag, should be lower-case, and use `-` to separate words
 *
 * @example multiple tags
 * tags: tag_a
 * ---
 *
 * @example single tag
 * tags:
 *   - tag_a
 *   - tag_b
 * ---
 */
export interface Tag {
  slug: string
  raw: string
}

export function resolveTags(frontmatter: Frontmatter): Tag[] {
  return stringsOrEmpty(frontmatter?.tags).map(
    (raw): Tag => ({
      slug: slugFriendly(raw),
      raw,
    })
  )
}

function stringsOrEmpty(v: any): string[] {
  if (!v) return []
  if (!Array.isArray(v)) return [v.toString()]
  return v.map((a) => a.toString())
}

/**
 * Category
 *
 * @example single category
 *
 * categories:
 *   - category_a
 *   - category_a_1
 * ---
 *
 * @example multiple categories
 *
 * categories:
 * -
 *   - category_a
 *   - category_a_1
 * -
 *   - category_b
 *   -
 *     - category_b_1
 *     - category_b_2
 * - category_c
 * ---
 */
export interface Category {
  slug: string
  raw: string
  children: Category[]
}

export function resolveCategories(frontmatter: Frontmatter): Category[] {
  let categories = frontmatter.categories
  if (!categories) {
    // empty
    categories = []
  } else if (!Array.isArray(categories)) {
    // simple category without children
    categories = [[categories]]
  } else if (!Array.isArray(categories[0])) {
    // single category with children
    categories = [categories]
  }

  const resolved = categories.map((a: any) => _resolveCategories(a))
  return tryMergeCategories(resolved)
}

function _resolveCategories(v: any, slugPrefix: string = ""): Category {
  const vv = !Array.isArray(v) ? [v] : v
  if (vv.length < 1 || Array.isArray(vv[0])) {
    throw new Error("invalid category")
  }

  const root: Category = {
    slug: joinSlug(slugPrefix, slugFriendly(vv[0])),
    raw: vv[0],
    children: [],
  }
  let current = root
  for (let i = 1; i < vv.length; i++) {
    const u = vv[i]
    if (Array.isArray(u)) {
      // should be the last one
      if (i !== vv.length - 1) {
        throw new Error("invalid category, should be the last one")
      }

      current.children = u.map((a) => _resolveCategories(a, current.slug))
    } else {
      const prefix = current.slug
      const uu = u.toString()
      const category: Category = {
        slug: joinSlug(prefix, slugFriendly(uu)),
        raw: uu,
        children: [],
      }
      current.children.push(category)
      current = category
    }
  }

  return root
}

function tryMergeCategories(categories: Category[]): Category[] {
  const merged: Category[] = []
  for (const category of categories) {
    let flag = true
    for (const a of merged) {
      if (a.slug === category.slug) {
        a.children.push(...category.children)
        flag = false
        break
      }
    }

    if (flag) {
      merged.push(category)
    }
  }

  for (const category of merged) {
    category.children = tryMergeCategories(category.children)
  }

  return merged
}

function joinSlug(prefix: string, current: string): string {
  if (prefix === "") return current
  if (current === "") return prefix
  return `${prefix}/${current}`
}

export function parseCategorySlug(slug: string): {
  parts: string[]
  ancestors: string[]
} {
  const parts = slug.split("/")
  const ancestors = []
  for (let i = 0; i < parts.length; i++) {
    ancestors.push(parts.slice(0, i + 1).join("/"))
  }
  return { parts, ancestors }
}

/**
 * Author
 *
 * @example
 *
 * author: me
 * ---
 */
export function resolveAuthor(frontmatter: Frontmatter): string | null {
  return frontmatter?.author ?? null
}

/**
 * Created At
 *
 * @example
 *
 * date: 2023-01-01
 * ---
 */
export function resolveCreatedAt(frontmatter: Frontmatter): string | null {
  // TODO: from git
  return formatTime(frontmatter?.date)
}

/**
 * Updated At
 *
 * @example
 *
 * updated: 2023-01-01
 * ---
 */
export function resolveUpdatedAt(frontmatter: Frontmatter): string | null {
  // TODO: from git
  return formatTime(frontmatter?.updated)
}

function formatTime(t: string | null | undefined): string | null {
  return t ? new Date(t).toISOString() : null
}

export function resolveLocation(frontmatter: Frontmatter): string | null {
  return frontmatter?.location ?? null
}

export enum Layout {
  home = "home",
  archives = "archives",
  tags = "tags",
  catagories = "catagories",
  about = "about",
  page = "page",
}

export function resolveLayout(frontmatter: Frontmatter): Layout {
  switch (frontmatter?.layout) {
    case "home":
      return Layout.home
    case "archive":
      return Layout.archives
    case "tags":
      return Layout.tags
    case "catagories":
      return Layout.catagories
    case "about":
      return Layout.about
    case "page":
      return Layout.page
    default:
      return Layout.page
  }
}
