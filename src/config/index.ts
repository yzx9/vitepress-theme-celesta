import { defineConfigWithTheme } from "vitepress"

export type Config = {
  author?: string
  postDir?: string

  i18n?: {
    notFound?: string | string[]
    backToHome?: string | string[]
  }
}

export const defineConfig = defineConfigWithTheme<Config>
