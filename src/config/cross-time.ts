/**
 * @description
 * - This file is used to resolve the config from user input
 * - This file is intended for used in both build time and runtime.
 */

import type {
  Config,
  ResovledConfig,
  ResovledConfigGlobal,
  ResovledConfigLocale,
} from "./type"

const configGloabl: ResovledConfigGlobal = {
  postDir: "posts",
  excerptLength: 500,
  excerptSeprator: "<!-- end -->",
  catalogExpandedLessThan: 2,
}

const configLocaleZh: ResovledConfigLocale = {
  author: "",
  category: {},
  tag: {},
  notFound: [
    "你来到了世界尽头",
    "你来到了洪荒之地",
    "知识尚未触及",
    "令人尴尬，我们没找到这篇文章",
    "博主正在火速赶来",
    "这里什么都没有",
    "我们怎么到这来了？",
    "这是一个 404 页面",
    "看起来我们进入了错误的链接",
  ],
  backToHome: ["返回首页"],
}

const configLocaleEn: ResovledConfigLocale = {
  author: "",
  category: {},
  tag: {},
  notFound: [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links.",
    "You are drunk.",
    "The page you're looking for doesn't exist. Ooops",
    "This is awkward",
    "Oooops",
  ],
  backToHome: ["Take me home.", "Go Home", "Homepage", "HEAD ON HOME"],
}

export function resolveConfig(
  config: Config,
  configLocale: Config = {},
  locale: string = ""
): ResovledConfig {
  const configLocaleDefault = switchDefaultConfigLocale(locale)
  const resolved = Object.assign(
    {},
    configGloabl,
    configLocaleDefault,
    config,
    configLocale
  )
  resolved.category = toSlugFriendly(resolved.category)
  resolved.tag = toSlugFriendly(resolved.tag)
  return resolved
}

function switchDefaultConfigLocale(locale: string = ""): ResovledConfigLocale {
  switch (locale) {
    case "zh":
      return configLocaleZh
    case "en":
      return configLocaleEn
    default:
      return configLocaleZh
  }
}

function toSlugFriendly(v: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {}
  Object.keys(v).forEach((key) => {
    result[slugFriendly(key)] = v[key]
  })
  return result
}

export function slugFriendly(v: string): string {
  return v.toString().toLocaleLowerCase().replace(/\s+/g, "-")
}
