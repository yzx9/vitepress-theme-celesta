import { computed, type ComputedRef } from "vue"
import { useConfig, useData } from "../config/runtime"
import { resolveTags, type Tag } from "../frontmatter"

export type ResolvedTag = Tag & {
  title: string
}

export function useTags(): ComputedRef<ResolvedTag[]> {
  const data = useData()
  const config = useConfig()

  function resolveTitle(tag: Tag): string {
    return config.value.tag?.[tag.slug] ?? tag.raw
  }

  return computed(() =>
    resolveTags(data.frontmatter.value).map((a) => ({
      ...a,
      title: resolveTitle(a),
    }))
  )
}
