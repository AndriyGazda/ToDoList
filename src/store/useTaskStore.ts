import { create } from "zustand";
import type { Task, TaskStore } from "@/interface/taskInterface";

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: JSON.parse(localStorage.getItem("task") || "[]"),
  sortOption: "",

  addTask: (task) => {
    const state = get();
    const updatedTasks = [...state.tasks, task];
    localStorage.setItem("task", JSON.stringify(updatemodifiedTasks));

    return set(() => {
      const sortedTasks = sortByOption(updatedTasks, state.sortOption);
      return { tasks: sortedTasks };
    });
  },

  editTask: (task) => {
    const state = get();
    const updatedTasks = state.tasks.map((t) => (t.id === task.id ? task : t));
    localStorage.setItem("task", JSON.stringify(updatedTasks));

    return set(() => {
      const sortedTasks = sortByOption(updatedTasks, state.sortOption);
      return { tasks: sortedTasks };
    });
  },

  deleteTask: (id) => {
    const state = get();
    const updatedTasks = state.tasks.filter((t) => t.id !== id);
    localStorage.setItem("task", JSON.stringify(updatedTasks));

    return set(() => {
      const sortedTasks = sortByOption(updatedTasks, state.sortOption);
      return { tasks: sortedTasks };
    });
  },

  sortTasks: (sortOption) => {
    const state = get();
    const sortedTasks = sortByOption(state.tasks, sortOption);
    return set(() => ({ tasks: sortedTasks, sortOption }));
  },
}));

function sortByOption(tasks: Task[], sortOption: string) {
  if (!sortOption) return tasks;

  const sorted = [...tasks].sort((a, b) => {
    if (sortOption === "status") {
      return a.status.localeCompare(b.status);
    } else if (sortOption === "priority") {
      const priorityOrder = ["low", "medium", "high"];
      return (
        priorityOrder.indexOf(a.priority.toLowerCase()) -
        priorityOrder.indexOf(b.priority.toLowerCase())
      );
    } else if (sortOption === "date") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    return 0;
  });

  return sorted;
}
