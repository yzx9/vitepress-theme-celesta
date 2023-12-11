/**
 * @description
 * - This file is used to resolve the config from user input
 * - This file is intended for used in build time only
 */

import type { SiteConfig } from "vitepress"
import { resolveConfig } from "./cross-time"
import type { Config, ResovledConfig } from "./type"

export const siteConfig: SiteConfig<Config> = (globalThis as any)
  .VITEPRESS_CONFIG

export const config: ResovledConfig = resolveConfig(siteConfig.site.themeConfig)
