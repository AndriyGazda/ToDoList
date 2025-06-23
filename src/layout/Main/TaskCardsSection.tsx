import TaskCard from "./TaskCard/TaskCard";
import type { Task } from "../../hooks/useTask";

interface TaskCardsSectionProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
}

const TaskCardsSection = ({ tasks, onDeleteTask }: TaskCardsSectionProps) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </div>
  );
};

export default TaskCardsSection;
