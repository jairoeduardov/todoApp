import { useState } from 'react';
import axios from 'axios';

const useDeleteTaskList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTaskList = async (taskListId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      // Llamada al API para eliminar la TaskList
      await axios.delete(`http://localhost:8082/todo/api/v1/task-list/${taskListId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return true; // Indica que la eliminación fue exitosa
    } catch (err: any) {
      console.error('Error deleting TaskList:', err);
      setError(err.message || 'Failed to delete the task list.');
      return false; // Indica que la eliminación falló
    } finally {
      setLoading(false);
    }
  };

  return { deleteTaskList, loading, error };
};

export default useDeleteTaskList;
