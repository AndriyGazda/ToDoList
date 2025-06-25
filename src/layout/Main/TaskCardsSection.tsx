import TaskCard from "./TaskCard/TaskCard";
import type { Task } from "../../hooks/useTask";

interface TaskCardsSectionProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskCardsSection = ({
  tasks,
  onEditTask,
  onDeleteTask,
}: TaskCardsSectionProps) => {
  console.log("TaskCardsSection render");
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskCardsSection;
