import { useState, useEffect } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
}

export const useTask = () => {
  const [task, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("task");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  const addTask = (newTask: Task) =>
    setTasks((prevTasks) => [...prevTasks, newTask]);
  const editTask = (edit: Task) =>
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === edit.id ? edit : task))
    );
  const deleteTask = (delet: Task) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== delet.id));
  };

  return { task, addTask, editTask, deleteTask };
};
