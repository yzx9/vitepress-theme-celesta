import { useRouter } from "vitepress"
import { computed, type ComputedRef } from "vue"
import { data as categoryData } from "../category.data"
import { data as postsData } from "../posts.data"
import { data as tagData } from "../tag.data"
import { data as timelineData } from "../timeline.data"

type NavLink = {
  title: string
  url: string
  go(): void
}

type NavLinks = {
  type: "timeline" | "tag" | "category"
  prev: NavLink | null
  next: NavLink | null
}

export function useNavLinks(): ComputedRef<NavLinks> {
  const router = useRouter()

  function tryParseCategory(): string | null {
    return null // TODO
  }

  function tryParseTag(): string | null {
    return null // TODO
  }

  function getNavLinksByCategory(category: string): NavLinks | null {
    const posts = categoryData.posts[category]
    const links = findNavLinks(posts)
    return links && { type: "category", prev: links.prev, next: links.next }
  }

  function getNavLinksByTag(tag: string): NavLinks | null {
    const posts = tagData.posts[tag]
    const links = findNavLinks(posts)
    return links && { type: "tag", prev: links.prev, next: links.next }
  }

  function getNavLinksByTimeline(): NavLinks {
    const links = findNavLinks(timelineData.timeline)
    return {
      type: "timeline",
      prev: links?.prev ?? null,
      next: links?.next ?? null,
    }
  }

  function findNavLinks(
    posts: string[] | undefined
  ): Omit<NavLinks, "type"> | null {
    if (!posts) return null
    const i = posts.findIndex((a) => a === router.route.path)
    if (i === -1) return null
    // note that the order of prev and next is reversed
    return {
      prev: i + 1 <= posts.length ? newNavLink(posts[i + 1]) : null,
      next: i - 1 >= 0 ? newNavLink(posts[i - 1]) : null,
    }
  }

  function newNavLink(url: string): NavLink {
    return {
      title: postsData.posts[url]?.title ?? url,
      url,
      go: () => router.go(url),
    }
  }

  return computed(() => {
    const category = tryParseCategory()
    if (category) {
      const links = getNavLinksByCategory(category)
      if (links) {
        return links
      }
    }

    const tag = tryParseTag()
    if (tag) {
      const links = getNavLinksByTag(tag)
      if (links) {
        return links
      }
    }

    return getNavLinksByTimeline()
  })
}
