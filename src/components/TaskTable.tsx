import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
} from '@mui/material';
import { Task, TaskStatus } from '../types/api/task';
import { getStatusChipColor, getPriorityChipColor, getStatusLabel, getPriorityLabel } from '../utils/taskHelpers';
import axios from 'axios';

interface TaskTableProps {
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void; // Callback para actualizar el estado local
  onDeleteTask: (taskId: string) => void; // Callback para eliminar la tarea del estado local

}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  // Función para marcar una tarea como completada
  const handleMarkAsCompleted = async (task: Task) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      const updatedTask = {
        ...task,
        status: 'COMPLETED', // Cambiar el estado a COMPLETED
      };

      // Llamada al backend
      const response = await axios.put(
        `http://localhost:8082/todo/api/v1/tasks/${task.uuid}`,
        { data: updatedTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Actualizar el estado local con la tarea actualizada
      onUpdateTask(response.data.data);
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      // Llamada al backend para eliminar la tarea
      await axios.delete(`http://localhost:8082/todo/api/v1/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualizar el estado local eliminando la tarea
      onDeleteTask(taskId);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Prioridad</TableCell>
            <TableCell>Fecha de Vencimiento</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks && tasks.map((task) => (
            <TableRow key={task.uuid}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(task.status) }
                  color={  getStatusChipColor(task.status) }
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={getPriorityLabel(task.priority)}
                  color={getPriorityChipColor(task.priority)}
                />
              </TableCell>
              <TableCell>{new Date(task.dueDate).toLocaleString()}</TableCell>
              <TableCell>
                {task.status !== TaskStatus.COMPLETED && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleMarkAsCompleted(task)}
                  >
                    Marcar como Completada
                  </Button>
                )}
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteTask(task.uuid)}
                  >
                    Eliminar
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
