import { inject, ref, type InjectionKey, type Ref } from "vue"
import { Locale, parseLocale } from "./config/cross-time"

export const KEY_I18N: InjectionKey<Ref<i18n>> = Symbol("i18n")

interface i18n {
  // navbar
  archives: string
  categories: string
  tags: string
  about: string

  // page
  classifyAt: string
  updatedAt: string
  dateFormat: string

  // catalog
  catalog: string

  // posts
  fullText: string

  // 404
  notFound: string[]
  backToHome: string[]
}

export function useI18n(): Ref<i18n> {
  return inject(KEY_I18N, ref(switchI18n()))
}

export function switchI18n(locale: string = ""): i18n {
  switch (parseLocale(locale)) {
    case Locale.zh:
      return i18nZh
    case Locale.en:
      return i18nEn
  }
}

const i18nZh: i18n = {
  archives: "归档",
  categories: "分类",
  tags: "标签",
  about: "关于",

  classifyAt: "分类于",
  updatedAt: "更新于",
  dateFormat: "yyyy 年 MM 月 dd 日",

  catalog: "本页目录",

  fullText: "阅读全文",

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

const i18nEn: i18n = {
  archives: "ARCHIVES",
  categories: "CATEGORIES",
  tags: "TAGS",
  about: "ABOUT",

  classifyAt: "Classify At",
  updatedAt: "Updated At",
  dateFormat: "dd MMM yyyy",

  catalog: "On this page",

  fullText: "Full Text",

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
