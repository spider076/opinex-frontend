/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_OPINEX_CONTRACT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 