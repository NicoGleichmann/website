// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_RECAPTCHA_SITE_KEY: string
    // Füge hier weitere Umgebungsvariablen hinzu, die mit VITE_ beginnen
    // Wenn du z.B. VITE_API_URL in deiner .env-Datei hast, füge es hier hinzu:
    // readonly VITE_API_URL: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }