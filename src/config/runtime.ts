/**
 * @description
 * - This file is used to resolve the config from user input
 * - This file is intended for used in runtime only
 */

import { useData as _useData, type VitePressData } from "vitepress"
import { computed, type ComputedRef } from "vue"
import { resolveConfig } from "./cross-time"
import type { ResovledConfig } from "./type"

export { type ResovledConfig as ConfigWithDefault }

export function useData(): VitePressData<ResovledConfig> {
  return _useData<ResovledConfig>()
}

export function useConfig(): ComputedRef<ResovledConfig> {
  const data = useData()

  const locale = computed(
    () => data.site.value.locales?.[data.localeIndex.value].themeConfig ?? {}
  )

  return computed(() =>
    resolveConfig(data.theme.value, locale.value, data.localeIndex.value)
  )
}
