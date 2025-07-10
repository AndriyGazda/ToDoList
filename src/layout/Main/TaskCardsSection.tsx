import { useTaskStore } from "../../store/useTaskStore";
import TaskCard from "./TaskCard/TaskCard";
import classes from "./TaskCardsSection.module.css";

const TaskCardsSection = () => {
  const tasks = useTaskStore((state) => state.tasks);

  console.log("TaskCardsSection render");
  return (
    <div className={classes.taskCardsSection}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskCardsSection;
