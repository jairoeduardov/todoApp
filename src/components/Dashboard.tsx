import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskTable from './TaskTable';
import { useFetchTasks } from '../hooks/useFetchTasks';
import useDeleteTaskList from '../hooks/useDeleteTaskList';
import AddTaskForm from './AddTaskForm';
import AddTaskListForm from './AddTaskListForm';
import Header from './Header';
import ConfirmDialog from './ConfirmDialog'; // Importar el modal de confirmación

const Dashboard: React.FC = () => {
  const { taskLists, loading, error, setTaskLists } = useFetchTasks();
  const { deleteTaskList } = useDeleteTaskList();
  const [openModal, setOpenModal] = useState(false);
  const [openTaskListModal, setOpenTaskListModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleOpenModal = (listId: string) => {
    setSelectedListId(listId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedListId(null);
  };

  const handleDeleteTaskList = async () => {
    if (selectedListId) {
      const success = await deleteTaskList(selectedListId);
      if (success) {
        setTaskLists((prevTaskLists) =>
          prevTaskLists.filter((list) => list.uuid !== selectedListId)
        );
      }
      setConfirmDialogOpen(false); // Cierra el modal
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ padding: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4">Lista de Tareas</Typography>
          <IconButton
            color="primary"
            onClick={() => setOpenTaskListModal(true)}
            aria-label="Crear Nueva Lista"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>

        {taskLists.map((list) => (
          <Accordion key={list.uuid}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box>
                <Typography variant="h5" component="div">{list.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {list.description}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <IconButton
                  color="primary"
                  onClick={() => handleOpenModal(list.uuid)}
                  aria-label="Añadir Tarea"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    setSelectedListId(list.uuid); // Selecciona la lista para eliminar
                    setConfirmDialogOpen(true); // Abre el modal de confirmación
                  }}
                  aria-label="Eliminar Lista"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <TaskTable
                tasks={Array.isArray(list.tasks) ? list.tasks : []}
                onUpdateTask={(updatedTask) =>
                  setTaskLists((prev) =>
                    prev.map((l) =>
                      l.uuid === updatedTask.taskList.uuid
                        ? {
                            ...l,
                            tasks: l.tasks.map((task) =>
                              task.uuid === updatedTask.uuid ? updatedTask : task
                            ),
                          }
                        : l
                    )
                  )
                }
                onDeleteTask={(taskId) =>
                  setTaskLists((prev) =>
                    prev.map((l) => ({
                      ...l,
                      tasks: l.tasks.filter((task) => task.uuid !== taskId),
                    }))
                  )
                }
              />
            </AccordionDetails>
          </Accordion>
        ))}

        {selectedListId && (
          <AddTaskForm
            listId={selectedListId}
            onAddTask={(listId, newTask) =>
              setTaskLists((prevTaskLists) =>
                prevTaskLists.map((list) =>
                  list.uuid === listId
                    ? {
                        ...list,
                        tasks: [...list.tasks, newTask],
                      }
                    : list
                )
              )
            }
            open={openModal}
            onClose={handleCloseModal}
          />
        )}

        <AddTaskListForm
          open={openTaskListModal}
          onClose={() => setOpenTaskListModal(false)}
          onAddTaskList={(newTaskList) =>
            setTaskLists((prevTaskLists) => [...prevTaskLists, newTaskList])
          }
        />
      </Box>

      {/* Modal de confirmación */}
      <ConfirmDialog
        open={confirmDialogOpen}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que deseas eliminar esta lista de tareas? Esta acción no se puede deshacer."
        onConfirm={handleDeleteTaskList}
        onClose={() => setConfirmDialogOpen(false)}
      />
    </>
  );
};

export default Dashboard;
