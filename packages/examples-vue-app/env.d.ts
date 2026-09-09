/// <reference types="vite/client" />

// oxlint-disable-next-line typescript/no-empty-object-type
interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_NUMBER_VALUE: number
  readonly VITE_BOOLEAN_VALUE: boolean
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
