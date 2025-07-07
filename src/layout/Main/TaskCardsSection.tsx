import type { Task } from "../../hooks/useTask";
import TaskCard from "./TaskCard/TaskCard";
import classes from "./TaskCardsSection.module.css";

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
    <div className={classes.taskCardsSection}>
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
