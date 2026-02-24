/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TAVILY_API_KEY: string
  readonly VITE_AKSHARE_API_URL: string
  readonly VITE_OPENBB_API_URL: string
  readonly VITE_USE_REAL_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
