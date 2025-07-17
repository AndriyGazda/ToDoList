import { create } from "zustand";
import type { Task, TaskStore } from "@/interface/task.interface.ts";
import { persist } from "zustand/middleware";

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      sortOption: "",

      addTask: (task) => {
        const state = get();
        const updatedTasks = [...state.tasks, task];
        const sortedTasks = sortByOption(updatedTasks, state.sortOption);
        set({ tasks: sortedTasks });
      },

      editTask: (task) => {
        const state = get();
        const updatedTasks = state.tasks.map((t) =>
          t.id === task.id ? task : t,
        );
        const sortedTasks = sortByOption(updatedTasks, state.sortOption);
        set({ tasks: sortedTasks });
      },

      deleteTask: (id) => {
        const state = get();
        const updatedTasks = state.tasks.filter((t) => t.id !== id);
        const sortedTasks = sortByOption(updatedTasks, state.sortOption);
        set({ tasks: sortedTasks });
      },

      sortTasks: (sortOption) => {
        const state = get();
        const sortedTasks = sortByOption(state.tasks, sortOption);
        set({ tasks: sortedTasks, sortOption });
        },
    }),
    {
      name: "tasks",
    },
  ),
);

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
