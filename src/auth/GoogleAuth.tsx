import { useNavigate } from 'react-router-dom';

const GoogleAuth: React.FC = () => {

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  //console.log('Google Client ID:', clientId);
  //console.log('redirectUri', redirectUri)

  const navigate = useNavigate();

  const handleLogin = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=email profile&include_granted_scopes=true`;    
    window.location.href = authUrl;
  };

  return (
    <button onClick={handleLogin}>
      Iniciar sesión con Google
    </button>
  );

};

export default GoogleAuth;