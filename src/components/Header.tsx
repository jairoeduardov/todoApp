import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

const Header: React.FC = () => {
  const { logout } = useAuth(); // Hook para manejar el logout
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout(); 
    logout(); 
    navigate('/'); 
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          To Do App
        </Typography>
        <Box>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
