import { CredentialResponse, GoogleLogin, googleLogout } from '@react-oauth/google';
import React from 'react'
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de tener un contexto de autenticación
import { GoogleUser, User } from '../types/auth';

export const Landing: React.FC = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  function handleLogout() {
    googleLogout();
  }

  const handleSuccess = (credentialResponse: CredentialResponse) => {

    if (credentialResponse.credential) {
      const token = credentialResponse.credential;
      const decoded = jwtDecode<GoogleUser>(credentialResponse.credential);
      const user: GoogleUser = {
        sub: decoded.sub, // ID único proporcionado por Google
        username: decoded.email.split('@')[0], // Usa el correo como username
        email: decoded.email,
        name: decoded.name,
        given_name: decoded.given_name, // Primer nombre
        family_name: decoded.family_name, // Apellido
        picture: decoded.picture, // URL de la foto de perfil
      };
      login(token, user); // Actualiza el estado de autenticación
      navigate('/dashboard'); // Redirige al usuario a la ruta protegida

    }
  };



  return (
    <>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("login failed")}
        auto_select={true} />

    </>
  )
}
