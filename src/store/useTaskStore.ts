import { create } from "zustand";
import type { TaskStore } from "@/interface/task.interface.ts";
import { persist } from "zustand/middleware";
import { sortByOption } from "@/helpers/functions/sortByOption.function.ts";

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
