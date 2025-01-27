# Todo Task App

Una aplicación de gestión de tareas que permite a los usuarios organizar listas de tareas y tareas individuales con autenticación mediante Google.

## **Requisitos previos**

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js**: [Descargar Node.js](https://nodejs.org/)
- **Yarn** (opcional, pero recomendado): Instala Yarn usando el comando:
  ```bash
  npm install --global yarn
  ```
- **Google OAuth Client ID**: Necesitarás un ID de cliente de Google configurado para la autenticación OAuth.

## **Configuración del proyecto**

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/jairoeduardov/todoApp.git
   cd   todoApp
   ```

2. **Instalar dependencias**:
   Si usas Yarn:
   ```bash
   yarn install
   ```

   Si prefieres npm:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:
   ```plaintext
   VITE_GOOGLE_CLIENT_ID=tu-google-client-id
   VITE_API_BASE_URL=http://localhost:8082/todo/api/v1
   ```

   - `VITE_GOOGLE_CLIENT_ID`: Reemplázalo con tu ID de cliente de Google.
   - `VITE_API_BASE_URL`: Asegúrate de que esta URL apunte a tu backend.

## **Ejecución del proyecto en modo de desarrollo**

Este proyecto utiliza **Vite** como herramienta de compilación, lo que permite un entorno de desarrollo rápido y eficiente.

Para iniciar el servidor de desarrollo, ejecuta:

Si usas Yarn:
```bash
yarn dev
```

Si prefieres npm:
```bash
npm run dev
```

Esto iniciará la aplicación en `http://localhost:3000`.

## **Compilar para producción**

Para compilar la aplicación para producción, ejecuta:

Si usas Yarn:
```bash
yarn build
```

Si prefieres npm:
```bash
npm run build
```

El proyecto compilado estará disponible en la carpeta `dist`.

## **Previsualizar la compilación**

Después de compilar, puedes previsualizar el proyecto con:

Si usas Yarn:
```bash
yarn preview
```

Si prefieres npm:
```bash
npm run preview
```

## **Características principales**

- **Autenticación con Google**: Inicia sesión de manera segura con OAuth.
- **Gestión de tareas**: Crea, actualiza y elimina listas de tareas y tareas individuales.
- **Prioridades y estados**: Define prioridades y estados para cada tarea.

## **Dependencias principales**

- [React](https://reactjs.org/): Biblioteca para construir interfaces de usuario.
- [Vite](https://vitejs.dev/): Herramienta de compilación rápida.
- [Material-UI](https://mui.com/): Componentes estilizados para React.
- [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google): Manejo de OAuth para Google.

---

## **Contacto**

Si tienes preguntas o sugerencias, no dudes en contactarme:

- **Autor**: [Jairo Vides](https://github.com/jairoeduardov)
- **Email**: jairoeduardov@gmail.com