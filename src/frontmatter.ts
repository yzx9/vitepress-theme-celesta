import { slugFriendly } from "./config/build-time"

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
}

export function resolveTags(frontmatter: Frontmatter): Tag[] {
  return stringsOrEmpty(frontmatter?.tags).map(
    (v): Tag => ({ slug: slugFriendly(v) })
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
 *   - category_a
 *     - category_a_1
 *     - category_a_2
 *   - category_b
 *     - category_b_1
 *     - category_b_2
 *       - category_b_2_i
 *       - category_b_2_ii
 *   - category_c
 * ---
 */
export interface Category {
  slug: string
  children: Category[]
}

export function resolveCategories(
  frontmatter: Frontmatter,
  slugPrefix: string = ""
): Category[] {
  let categories = frontmatter?.categories
  if (!categories) {
    // empty
    return []
  }

  if (!Array.isArray(categories)) {
    // simple category without children
    const name = categories.toString()
    const category: Category = {
      slug: joinSlug(slugPrefix, name),
      children: [],
    }
    return [category]
  }

  const arr: Category[] = []
  for (const v of categories) {
    const vv = !Array.isArray(v) ? [v] : v
    if (vv.length < 1 || Array.isArray(vv[0])) {
      throw new Error("invalid category")
    }

    const root: Category = {
      slug: joinSlug(slugPrefix, slugFriendly(vv[0])),
      children: [],
    }
    let current = root
    for (let i = 1; i < vv.length; i++) {
      const u = vv[i]
      if (Array.isArray(u)) {
        // should be the last one
        if (i !== vv.length - 1) {
          throw new Error("invalid category")
        }

        current.children = resolveCategories(u, current.slug)
      } else {
        const category: Category = {
          slug: joinSlug(current.slug, slugFriendly(u.toString())),
          children: [],
        }
        current.children.push(category)
        current = category
      }
    }

    arr.push(root)
  }
  return arr
}

function joinSlug(v: string, prefix: string): string {
  return `${prefix}/${v}`
}

/**
 * Created At
 *
 * @example
 *
 * date: 2023-01-01
 * ---
 */
export function resolveCreatedAt(frontmatter: Frontmatter): string {
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
export function resolveUpdatedAt(frontmatter: Frontmatter): string {
  return formatTime(frontmatter?.updated)
}

export const DateDefault = new Date(1970, 0, 1).toISOString()

function formatTime(t: string | null | undefined): string {
  return t ? new Date(t).toISOString() : DateDefault
}
