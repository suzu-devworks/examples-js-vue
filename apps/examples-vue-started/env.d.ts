/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_FILENAME: string
  readonly VITE_VARIABLE_1: string
  readonly VITE_VARIABLE_2: string
  readonly VITE_VARIABLE_3: string
  readonly VITE_VARIABLE_4: string
  readonly VITE_VARIABLE_5: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
