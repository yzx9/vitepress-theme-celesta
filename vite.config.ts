import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/theme/index.ts"),
      formats: ["es"],
      name: "vitepress-theme-celesta",
      fileName: "theme",
    },
    rollupOptions: {
      external: ["vue", "vitepress"],
      output: {
        globals: {
          vue: "Vue",
          vitepress: "vitepress",
        },
      },
    },
  },
})
