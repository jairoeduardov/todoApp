interface ImportMetaEnv {
    readonly VITE_GOOGLE_CLIENT_ID: string; // Agrega aquí otras variables de entorno según sea necesario
    // Ejemplo de otra variable: readonly VITE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}