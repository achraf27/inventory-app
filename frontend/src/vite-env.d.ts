/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // ajoute d'autres variables VITE_ si nécessaire
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
