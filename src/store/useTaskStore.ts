import { create } from "zustand";
import type { TaskStore } from "../interface/taskInterface";

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: JSON.parse(localStorage.getItem("task") || "[]"),
  addTask: (task) =>
    set((state) => {
      const updatedTasks = [...state.tasks, task];
      localStorage.setItem("task", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
  editTask: (task) =>
    set((state) => {
      const updatedTasks = state.tasks.map((editTask) =>
        editTask.id === task.id ? task : editTask
      );
      localStorage.setItem("task", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("task", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
}));
