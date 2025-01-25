import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { GoogleUser, User } from '../types/auth';

const GoogleAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
    useEffect(() => {
    const handleAuthentication = () => {
      // Extrae el token de la URL (simulación)
      const params = new URLSearchParams(location.hash.replace('#', '?'));
      console.log(location)
      console.log(params)

      const credential = params.get('credential');
      const token = params.get('access_token');
      if (credential) {
        const decoded = jwtDecode<GoogleUser>(credential);
        console.log('Token recibido:', token);
        // Mapea los datos para el formato esperado en tu contexto
        const user: User = {
          uuid: decoded.sub, // ID único proporcionado por Google
          username: decoded.email.split('@')[0], // Usa el correo como username
          email: decoded.email,
          name: decoded.name,
          firstName: decoded.name.split(' ')[0], // Primer nombre
        };

        login(credential, user); // Actualiza el contexto con los datos del usuario
        navigate('/dashboard'); // Redirige al usuario a la página principal
      } else {
        console.error('No se encontró el token en la URL');
        //navigate('/login'); // Redirige al usuario a la página de inicio de sesión
      }
    };

    handleAuthentication();
  }, [location, login, navigate]);

  return <div>Cargando...</div>;
};

export default GoogleAuthCallback;