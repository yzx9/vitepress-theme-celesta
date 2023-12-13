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
}

const configLocaleEn: ResovledConfigLocale = {
  author: "",
  category: {},
  tag: {},
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
  switch (parseLocale(locale)) {
    case Locale.zh:
      return configLocaleZh
    case Locale.en:
      return configLocaleEn
  }
}

export enum Locale {
  zh,
  en,
}

export function parseLocale(locale: string = ""): Locale {
  if (locale.search(/zh/i) !== -1) return Locale.zh
  if (locale.search(/en/i) !== -1) return Locale.en
  return Locale.zh
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
