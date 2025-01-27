import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRoutes.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import Header from './components/Header.tsx'

// Recuperar las variables
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';;

console.log('CLIENT_ID:', CLIENT_ID);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <BrowserRouter>
        <AuthProvider>          
          <AppRouter />
          </AuthProvider>
        </BrowserRouter>
      </GoogleOAuthProvider>
  </StrictMode>,
)