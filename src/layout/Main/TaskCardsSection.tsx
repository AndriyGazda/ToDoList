import TaskCard from "./TaskCard/TaskCard";
import classes from "./TaskCardsSection.module.css";
import { useTaskContext } from "../../context/TaskContext";
import { useMemo } from "react";

const TaskCardsSection = () => {
  const { tasks } = useTaskContext();
  const memoizedTasks = useMemo(
    () => tasks.map((task) => <TaskCard key={task.id} task={task} />),
    [tasks]
  );

  console.log("TaskCardsSection render");
  return <div className={classes.taskCardsSection}>{memoizedTasks}</div>;
};

export default TaskCardsSection;
