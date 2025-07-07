import { createContext, useContext } from "react";
import { type Task } from "../hooks/useTask";

interface TaskContextType {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  editTask: (edit: Task) => void;
  deleteTask: (id: string) => void;
}
export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskProvider");
  }
  return context;
};
