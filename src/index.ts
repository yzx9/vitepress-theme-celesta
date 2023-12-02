import type { Theme } from "vitepress"
import Layout from "./Layout.vue"
import "./style.css"

export type { Config } from "./config"

export const theme: Theme = {
  Layout,
}
