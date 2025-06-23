import type { Task } from "../../../hooks/useTask";

interface TaskCardProps {
  task: Task;
}
const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div>
      <h3>{task.title}</h3>
    </div>
  );
};

export default TaskCard;
