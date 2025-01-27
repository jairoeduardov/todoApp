import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { GoogleUser } from '../types/auth';
import { Box, Typography, Card, CardContent } from '@mui/material';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const token = credentialResponse.credential;
      const decoded = jwtDecode<GoogleUser>(credentialResponse.credential);
      const user: GoogleUser = {
        sub: decoded.sub,
        username: decoded.email.split('@')[0],
        email: decoded.email,
        name: decoded.name,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
        picture: decoded.picture,
      };
      login(token, user);
      navigate('/dashboard');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: 400, padding: 2, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
            Bienvenido a To Do
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary" gutterBottom>
            Inicia sesión con tu cuenta de Google para acceder a la plataforma.
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log('Error al iniciar sesión')}
              auto_select={true}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
