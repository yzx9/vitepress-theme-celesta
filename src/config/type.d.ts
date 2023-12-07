export type Config = ConfigLocale & ConfigGlobal

export type ConfigGlobal = {
  /**
   * @default "posts"
   */
  postDir?: string

  /**
   * @default 500
   */
  excerptLength?: number

  /**
   * @default "<!-- end -->"
   */
  excerptSeprator?: string
}

export type ConfigLocale = {
  /**
   * Blog Author
   */
  author?: string

  /**
   * Map from category to name, key is slug, value is name
   */
  category?: Record<string, string>

  /**
   * Map from tag to name, key is slug, value is name
   */
  tag?: Record<string, string>

  /**
   * Not Found Messages
   */
  notFound?: string | string[]

  /**
   * Back To Home Messages
   */
  backToHome?: string | string[]
}

type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>
}

export type ResovledConfigGlobal = DeepRequired<ConfigGlobal>
export type ResovledConfigLocale = DeepRequired<ConfigLocale>
export type ResovledConfig = ResovledConfigGlobal & ResovledConfigLocale
