/**
 * @description
 * - This file is intended for use in a Node.js environment only.
 * - This file will be compiled to `.js` file.
 */

import { defineConfigWithTheme } from "vitepress"
import type { Config } from "./type"

export const defineConfig = defineConfigWithTheme<Config>
