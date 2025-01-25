import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Paper,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {  TaskStatus, TaskPriority, TaskListResponse, TaskList } from '../types/api/task';
import axios from 'axios';
import { GoogleUser } from '../types/auth';


const Dashboard: React.FC = () => {


  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const getStatusChipColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.PENDING:
        return 'warning';
      case TaskStatus.IN_PROGRESS:
        return 'info';
      case TaskStatus.COMPLETED:
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityChipColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.LOW:
        return 'default';
      case TaskPriority.MEDIUM:
        return 'primary';
      case TaskPriority.HIGH:
        return 'error';
      default:
        return 'default';
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtén el token de Google (asegúrate de haber autenticado al usuario antes).
        const token = localStorage.getItem('token');
        const user:GoogleUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (!token) {
          throw new Error('No Google authentication token found.');
        }
        
        const response = await axios.get<TaskListResponse>(
          `http://localhost:8082/todo/api/v1/users/${user.sub}/task-lists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(response.data);
        setTaskLists(response.data.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

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
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de tareas
      </Typography>
      
      {taskLists.map((list, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{list.name}</Typography>
            <Typography sx={{ marginLeft: 2, color: 'text.secondary' }}>
              {list.description}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titulo</TableCell>
                    <TableCell>Descripcion</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Prioridad</TableCell>
                    <TableCell>Fecha de Vencimiento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {list.tasks.map((task, taskIndex) => (
                    <TableRow key={taskIndex}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={task.status}
                          color={getStatusChipColor(task.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={task.priority}
                          color={getPriorityChipColor(task.priority)}
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(task.dueDate).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Dashboard;
