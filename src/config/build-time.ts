import type { SiteConfig } from "vitepress"
import { slugFriendly, withDefaults } from "./base"
import type { Config, ResovledConfig } from "./type"

export const siteConfig: SiteConfig<Config> = (globalThis as any)
  .VITEPRESS_CONFIG

export const config: ResovledConfig = withDefaults(siteConfig.site.themeConfig)
export { slugFriendly }
