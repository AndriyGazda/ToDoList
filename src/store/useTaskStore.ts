import { create } from "zustand";
import type { TaskStore } from "@/interface/task.interface.ts";
import { sortByOption } from "@/helpers/functions/sortByOption.function.ts";
import axios from "axios";

const API_URL = "https://todolist-igmg.onrender.com/tasks";
// const API_URL = "https://http://localhost:3000/tasks";

export const useTaskStore = create<TaskStore>()((set, get) => ({
  tasks: [],
  sortOption: "",

  fetchTasks: async () => {
    const { sortOption } = get();
    const response = await axios.get(API_URL);
    const sorted = sortByOption(response.data, sortOption);
    set({ tasks: sorted });
  },

  addTask: async (task) => {
    const { sortOption } = get();
    const response = await axios.post(API_URL, task);
    const updated = [...get().tasks, response.data];
    const sorted = sortByOption(updated, sortOption);
    set({ tasks: sorted });
  },

  editTask: async (task) => {
    await axios.patch(`${API_URL}/${task.id}`, task);
    const updated = get().tasks.map((t) => (t.id === task.id ? task : t));
    const sorted = sortByOption(updated, get().sortOption);
    set({ tasks: sorted });
  },

  deleteTask: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    const updated = get().tasks.filter((t) => t.id !== id);
    const sorted = sortByOption(updated, get().sortOption);
    set({ tasks: sorted });
  },

  sortTasks: (sortOption) => {
    const sorted = sortByOption(get().tasks, sortOption);
    set({ tasks: sorted, sortOption });
  },
}));
