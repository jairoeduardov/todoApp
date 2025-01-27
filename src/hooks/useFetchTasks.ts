import { useState, useEffect } from 'react';
import axios from 'axios';
import { TaskList, TaskListResponse } from '../types/api/task';
import { GoogleUser } from '../types/auth';
export const useFetchTasks = () => {
  const [taskLists, setTaskLists] = useState<TaskList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        const user: GoogleUser = JSON.parse(localStorage.getItem('user') || 'null');

        if (!token || !user) {
          throw new Error('Missing authentication token or user data.');
        }

        const response = await axios.get<TaskListResponse>(
          `http://localhost:8082/todo/api/v1/users/${user.sub}/task-lists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const normalizedData = response.data.data.map((list: any) => ({
          ...list,
          tasks: Array.isArray(list.tasks) ? list.tasks : [], // Asegurar que `tasks` sea un array
        }));

        setTaskLists(normalizedData);
        
      } catch (err: any) {
        setError(err.message || 'Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { taskLists, setTaskLists, loading, error };
};
