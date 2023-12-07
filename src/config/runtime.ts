import { useData as _useData, type VitePressData } from "vitepress"
import { computed, type ComputedRef } from "vue"
import { withDefaults } from "./base"
import type { ResovledConfig } from "./type"

export { type ResovledConfig as ConfigWithDefault }

export function useData(): VitePressData<ResovledConfig> {
  return _useData<ResovledConfig>()
}

export function useConfig(): ComputedRef<ResovledConfig> {
  const data = useData()

  return computed(() => withDefaults(data.theme.value, data.localeIndex.value))
}
