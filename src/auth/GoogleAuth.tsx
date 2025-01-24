import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { GoogleUser, User } from '../types/auth';

const GoogleAuth = () => {

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  console.log('Google Client ID:', clientId);

  const { login } = useAuth();

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode<GoogleUser>(credentialResponse.credential);

      // Mapea los datos para el formato esperado en tu contexto
      const user: User = {
        uuid: decoded.sub, // ID único proporcionado por Google
        username: decoded.email.split('@')[0], //Se usa el correo como username
        email: decoded.email,
        name: decoded.name,
        firstName: decoded.name.split(' ')[0], // Primer nombre
      };

      login(credentialResponse.credential, user); // Actualiza el contexto con los datos del usuario
    } else {
      console.error('La respuesta no contiene credencial');
    }
  };

  const handleError = () => {
    console.log('Error en la autenticación');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;