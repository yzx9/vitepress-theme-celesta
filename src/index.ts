import { type Theme } from "vitepress"
import "vitepress/theme"
import Layout from "./Layout.vue"
import "./style.css"

export type { Config } from "./config/type"

export const theme: Theme = {
  Layout,
}
