import { Button } from "../../../component/ui/Button";
import type { Task } from "../../../hooks/useTask";

interface TaskCardProps {
  task: Task;
  onDeleteTask: (taskId: string) => void;
}
const TaskCard = ({ task, onDeleteTask }: TaskCardProps) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <Button onClick={() => onDeleteTask(task.id)}> Delete </Button>
    </div>
  );
};

export default TaskCard;
