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

interface AddTaskFormProps {
  listId: string; // UUID de la lista de tareas
  onAddTask: (listId: string, newTask: any) => void; // Actualización del estado local
  open: boolean; // Controla si el popup está abierto
  onClose: () => void; // Función para cerrar el popup
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({
  listId,
  onAddTask,
  open,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('LOW');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      status: 'PENDING',
      priority,
      dueDate: new Date().toISOString(),
      taskList: {
        uuid: listId,
      },
    };

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      // Persistir la nueva tarea en la API
      const response = await axios.post(
        'http://localhost:8082/todo/api/v1/tasks',
        { data: newTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Actualizar el estado local con la tarea creada
      onAddTask(listId, response.data.data);

      // Resetear el formulario
      setTitle('');
      setDescription('');
      setPriority('LOW');

      // Cerrar el popup
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al agregar la tarea.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Añadir nueva tarea</DialogTitle>
      <DialogContent>
        {error && (
          <Box sx={{ color: 'red', marginBottom: 2 }}>
            <strong>{error}</strong>
          </Box>
        )}
        <TextField
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <TextField
          label="Prioridad"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          fullWidth
          margin="normal"
          select
          SelectProps={{
            native: true,
          }}
          disabled={loading}
        >
          <option value="LOW">Baja</option>
          <option value="MEDIUM">Media</option>
          <option value="HIGH">Alta</option>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? 'Añadiendo...' : 'Añadir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskForm;
