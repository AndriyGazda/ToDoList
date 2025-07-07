import TaskControls from "./TaskControls/TaskControls";
import classes from "./Header.module.css";
import type { Task } from "../../hooks/useTask";
import { memo } from "react";

interface HeaderComponentProps {
  onAddTask: (task: Task) => void;
}
const HeaderComponent = memo(({ onAddTask }: HeaderComponentProps) => {
  console.log("HeaderComponent render");
  return (
    <>
      <div className={classes.header}>
        <h1>Task Manager</h1>
        <TaskControls onAddTask={onAddTask} />
      </div>
      <div className={classes.fullWidthLine} />
    </>
  );
});

export default HeaderComponent;
