import TaskControls from "./TaskControls/TaskControlsComponent";
import classes from "./HeaderComponent.module.css";
import type { Task } from "../../hooks/useTask";

interface HeaderComponentProps {
  onAddTask: (task: Task) => void;
}
const HeaderComponent = ({ onAddTask }: HeaderComponentProps) => {
  return (
    <>
      <div className={classes.header}>
        <h1>Task Manager</h1>
        <TaskControls onAddTask={onAddTask} />
      </div>
      <div className={classes.fullWidthLine} />
    </>
  );
};

export default HeaderComponent;
