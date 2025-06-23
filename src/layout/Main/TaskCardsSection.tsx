import TaskCard from "./TaskCard/TaskCard";
import type { Task } from "../../hooks/useTask";

interface TaskCardsSectionProps {
  tasks: Task[];
}

const TaskCardsSection = ({ tasks }: TaskCardsSectionProps) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskCardsSection;
