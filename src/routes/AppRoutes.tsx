import React from 'react';

import Dashboard from '../components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import { Landing } from '../pages/Landing';
import ProtectedRoute from '../auth/ProtectedRoute';


const AppRouter: React.FC = () => {
    return (

        <Routes>
            <Route path="/" element={<Landing />} />
            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;