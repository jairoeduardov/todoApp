import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import { Task, TaskStatus } from '../types/api/task';
import {
  getStatusChipColor,
  getPriorityChipColor,
  getStatusLabel,
  getPriorityLabel,
} from '../utils/taskHelpers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ConfirmDialog from './ConfirmDialog';
import useDeleteTask from '../hooks/useDeleteTask'; // Hook personalizado para eliminar
import useUpdateTask from '../hooks/useUpdateTask'; // Hook personalizado para actualizar

interface TaskTableProps {
  tasks: Task[];
  onUpdateTask: (updatedTask: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const { deleteTask } = useDeleteTask();
  const { updateTask } = useUpdateTask();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleDeleteTask = async () => {
    if (!selectedTaskId) return;

    const success = await deleteTask(selectedTaskId);
    if (success) {
      onDeleteTask(selectedTaskId); // Actualizar el estado local
    }

    setConfirmDialogOpen(false);
    setSelectedTaskId(null);
  };

  const handleMarkAsCompleted = async (task: Task) => {
    const updatedTask = { ...task, status: TaskStatus.COMPLETED };

    const result = await updateTask(updatedTask);
    if (result) {
      onUpdateTask(result); // Actualizar el estado local con la tarea actualizada
    }
  };

  const openConfirmDialog = (taskId: string) => {
    setSelectedTaskId(taskId);
    setConfirmDialogOpen(true);
  };

  return (
    <>
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
            {tasks.map((task) => (
              <TableRow key={task.uuid}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(task.status)}
                    color={getStatusChipColor(task.status)}
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
                    <IconButton
                      color="success"
                      size="small"
                      onClick={() => handleMarkAsCompleted(task)}
                      aria-label="Completar tarea"
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  )}
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => openConfirmDialog(task.uuid)} // Abre el diálogo de confirmación
                    aria-label="Eliminar tarea"
                  >
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        open={confirmDialogOpen}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer."
        onConfirm={handleDeleteTask}
        onClose={() => setConfirmDialogOpen(false)}
      />
    </>
  );
};

export default TaskTable;
