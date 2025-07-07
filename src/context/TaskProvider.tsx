import { type ReactNode, useMemo } from "react";
import { useTask } from "../hooks/useTask";
import { TaskContext } from "./TaskContext";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const { tasks, addTask, editTask, deleteTask } = useTask();

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      editTask,
      deleteTask,
    }),
    [tasks, addTask, editTask, deleteTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
