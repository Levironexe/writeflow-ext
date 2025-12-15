/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CEB_NEXT_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
