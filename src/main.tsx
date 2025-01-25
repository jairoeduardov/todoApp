import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRoutes.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

const CLIENT_ID = "339106763622-dmaf2tlpnu9j15ccq1djlraju25b9pbg.apps.googleusercontent.com"

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
