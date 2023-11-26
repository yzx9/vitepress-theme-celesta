import type { Theme } from "vitepress"
import Layout from "./Layout.vue"

export type Config = {}

export const theme: Theme = {
  Layout,
  enhanceApp({ app, router, siteData }) {
    console.log(app)
    console.log(router)
    console.log(siteData)
  },
}
