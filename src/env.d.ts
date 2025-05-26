/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: TodoList;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
