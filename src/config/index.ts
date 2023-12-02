import { defineConfigWithTheme } from "vitepress"

export type Config = {
  postDir?: string
}

export const defineConfig = defineConfigWithTheme<Config>
