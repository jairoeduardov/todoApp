import { useState } from 'react';
import axios from 'axios';
import { Task } from '../types/api/task';

const useUpdateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTask = async (updatedTask: Task): Promise<Task | null> => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      // Llamada al API para actualizar la tarea
      const response = await axios.put(
        `http://localhost:8082/todo/api/v1/tasks/${updatedTask.uuid}`,
        { data: updatedTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data; // Devuelve la tarea actualizada
    } catch (err: any) {
      console.error('Error updating task:', err);
      setError(err.message || 'Error updating task');
      return null; // Indica fallo
    } finally {
      setLoading(false);
    }
  };

  return { updateTask, loading, error };
};

export default useUpdateTask;
