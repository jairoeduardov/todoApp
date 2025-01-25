import React from 'react';
import GoogleAuth from '../auth/GoogleAuth';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <h1>Iniciar sesión</h1>
      <p>Por favor, inicia sesión con tu cuenta de Google para continuar.</p>
      <GoogleAuth /> {/* Botón de "Iniciar sesión con Google" */}
      <div className="alternative-options">
        <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>.</p>
      </div>
    </div>
  );
};

export default LoginPage;