import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Asegúrate de tener un contexto de autenticación

const ProtectedRoute: React.FC = () => {

    const { isAuthenticated } = useAuth(); // Verifica si el usuario está autenticado
    
    if (!isAuthenticated) {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        return <Navigate to="/" replace />;
    }

    // Si el usuario está autenticado, permite el acceso a la ruta
    return <Outlet />;
};

export default ProtectedRoute;