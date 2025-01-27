import { useState } from 'react';
import axios from 'axios';

const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTask = async (taskId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      // Llamada al API para eliminar la tarea
      await axios.delete(`http://localhost:8082/todo/api/v1/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true; // Indica éxito
    } catch (err: any) {
      console.error('Error deleting task:', err);
      setError(err.message || 'Error deleting task');
      return false; // Indica fallo
    } finally {
      setLoading(false);
    }
  };

  return { deleteTask, loading, error };
};

export default useDeleteTask;
