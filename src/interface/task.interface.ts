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
  sortOption: string;
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  sortTasks: (sortOption: string) => void;
}
