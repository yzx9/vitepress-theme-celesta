import path from "path"
import { createContentLoader } from "vitepress"
import { config } from "./config/build-time"
import { DateDefault, resolveCreatedAt } from "./frontmatter"

type Data = {
  createdAt: string
}

export declare const data: Data

export default createContentLoader(path.join(config.postDir, "**/*.md"), {
  transform: (data) => {
    const earliest = data
      .map((a) => resolveCreatedAt(a.frontmatter))
      .filter((a) => a !== DateDefault)
      .map((a) => new Date(a))
      .sort((a, b) => (a > b ? 1 : -1))[0]
    return {
      createdAt: earliest,
    }
  },
})
