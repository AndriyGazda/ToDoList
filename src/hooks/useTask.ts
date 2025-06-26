import { useState, useEffect, useCallback } from "react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
}

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("task");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback(
    (newTask: Task) => setTasks((prevTasks) => [...prevTasks, newTask]),
    []
  );
  const editTask = (edit: Task) =>
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === edit.id ? edit : task))
    );
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, editTask, deleteTask };
};
