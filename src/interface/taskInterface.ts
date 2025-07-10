export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}
