import type {Task} from "@/interface/task.interface.ts";

export function sortByOption(tasks: Task[], sortOption: string) {
  if (!sortOption) return tasks;

  const sorted = [...tasks].sort((a, b) => {
    if (sortOption === "status") {
      return a.status.localeCompare(b.status);
    } else if (sortOption === "priority") {
      const priorityOrder = [ "high" , "medium", "low" ];
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