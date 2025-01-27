import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import axios from 'axios';

interface AddTaskListFormProps {
  open: boolean;
  onClose: () => void;
  onAddTaskList: (newTaskList: any) => void; // Callback para actualizar el estado
}

const AddTaskListForm: React.FC<AddTaskListFormProps> = ({ open, onClose, onAddTaskList }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || 'null');

      if (!user || !token) {
        throw new Error('Usuario no autenticado.');
      }

      const newTaskList = {
        name,
        description,
        user: {
          uuid: user.sub,
        },
      };

      const response = await axios.post(
        'http://localhost:8082/todo/api/v1/task-list',
        { data: newTaskList },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onAddTaskList(response.data.data);

      // Cerrar el modal y resetear el formulario
      onClose();
      setName('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'Error al crear la lista de tareas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Añadir Nueva Lista de Tareas</DialogTitle>
      <DialogContent>
        {error && (
          <Box sx={{ color: 'red', marginBottom: 2 }}>
            <strong>{error}</strong>
          </Box>
        )}
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          disabled={loading}
        />
        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? 'Creando...' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskListForm;
