import { computed, type ComputedRef } from "vue"
import { useConfig, useData } from "../config/runtime"
import {
  parseCategorySlug,
  resolveCategories,
  type Category,
} from "../frontmatter"

export type ResolvedCategory = Omit<Category, "children"> & {
  title: string
  children: ResolvedCategory[]
}

export function useCategories(): ComputedRef<ResolvedCategory[]> {
  const data = useData()
  const config = useConfig()

  function resolveTitle(category: Category): string {
    if (Reflect.has(config.value.category, category.slug)) {
      // full slug match
      return config.value.category[category.slug]
    }

    const lastSlug = parseCategorySlug(category.slug).parts.pop()
    if (lastSlug && Reflect.has(config.value.category, lastSlug)) {
      // last slug match
      return config.value.category[lastSlug]
    }

    return category.raw
  }

  function resolvedCategory(category: Category): ResolvedCategory {
    return {
      ...category,
      title: resolveTitle(category),
      children: category.children.map(resolvedCategory),
    }
  }

  return computed(() =>
    resolveCategories(data.frontmatter.value).map(resolvedCategory)
  )
}
