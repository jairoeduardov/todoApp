export interface Task {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string; // ISO string for LocalDateTime
}

export interface TaskList {
  uuid: string; // Identificador único de la lista
  name: string; // Nombre de la lista
  description: string; // Descripción de la lista
  user: {
    uuid: string; // Identificador único del usuario asociado
  };
  tasks: Task[]; // Array de tareas asociadas a la lista
}


export interface Task {
  uuid: string; // Identificador único de la tarea
  title: string; // Título de la tarea
  description: string; // Descripción de la tarea
  status: TaskStatus; // Estado de la tarea
  priority: TaskPriority; // Prioridad de la tarea
  dueDate: string; // Fecha de vencimiento de la tarea
  taskList: {
    uuid: string; // Identificador único de la lista de tareas asociada
  };
}

export interface TaskListResponse {
  data: TaskList[]; // Array de listas de tareas
  errors: string[]; // Array de errores (puede estar vacío)
}

export enum TaskStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}