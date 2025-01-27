import { TaskStatus, TaskPriority } from '../types/api/task';

export const getStatusChipColor = (status: TaskStatus): 'warning' | 'info' | 'success' | 'default' => {
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

export const getPriorityChipColor = (priority: TaskPriority): 'default' | 'primary' | 'error' => {
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


export const getStatusLabel = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.PENDING:
      return 'PENDIENTE';
    case TaskStatus.IN_PROGRESS:
      return 'EN PROGRESO';
    case TaskStatus.COMPLETED:
      return 'COMPLETADO';
    default:
      return 'DESCONOCIDO';
  }
};

export const getPriorityLabel = (priority: TaskPriority): string => {
  switch (priority) {
    case TaskPriority.LOW:
      return 'BAJA';
    case TaskPriority.MEDIUM:
      return 'MEDIA';
    case TaskPriority.HIGH:
      return 'ALTA';
    default:
      return 'DESCONOCIDO';
  }
};