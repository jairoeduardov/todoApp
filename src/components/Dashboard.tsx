import React, { useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Ícono para añadir tareas

import TaskTable from './TaskTable';
import { useFetchTasks } from '../hooks/useFetchTasks';
import AddTaskForm from './AddTaskForm';
import AddTaskListForm from './AddTaskListForm';
import Header from './Header';

const Dashboard: React.FC = () => {
  const { taskLists, loading, error, setTaskLists } = useFetchTasks();
  const [openModal, setOpenModal] = useState(false);
  const [openTaskListModal, setOpenTaskListModal] = useState(false); // Nuevo modal para TaskList
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  const handleOpenModal = (listId: string) => {
    setSelectedListId(listId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedListId(null);
  };

  const handleAddTask = (listId: string, newTask: any) => {
    setTaskLists((prevTaskLists) =>
      prevTaskLists.map((list) =>
        list.uuid === listId
          ? {
              ...list,
              tasks: [...list.tasks, newTask],
            }
          : list
      )
    );
  };

  const handleAddTaskList = (newTaskList: any) => {
    setTaskLists((prevTaskLists) => [...prevTaskLists, newTaskList]);
  };

  const handleUpdateTask = (updatedTask: any) => {
    setTaskLists((prevTaskLists) =>
      prevTaskLists.map((list) =>
        list.uuid === updatedTask.taskList.uuid
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.uuid === updatedTask.uuid ? updatedTask : task
              ),
            }
          : list
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskLists((prevTaskLists) =>
      prevTaskLists.map((list) => ({
        ...list,
        tasks: list.tasks.filter((task) => task.uuid !== taskId),
      }))
    );
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
            <Typography variant="body2" sx={{ color: 'text.secondary' }} >
              {list.description}
            </Typography>
          </Box>
          </AccordionSummary>
          <AccordionDetails>

          <IconButton
            color="primary"
            onClick={() => handleOpenModal(list.uuid)}
            aria-label="Crear Nueva Lista"
          >
            <AddCircleOutlineIcon />
          </IconButton>

            
            <TaskTable
              tasks={Array.isArray(list.tasks) ? list.tasks : []} 
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          </AccordionDetails>
        </Accordion>
      ))}

      {selectedListId && (
        <AddTaskForm
          listId={selectedListId}
          onAddTask={handleAddTask}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}

      <AddTaskListForm
        open={openTaskListModal}
        onClose={() => setOpenTaskListModal(false)}
        onAddTaskList={handleAddTaskList}
      />
    </Box>
    </>
    
  );
};

export default Dashboard;
