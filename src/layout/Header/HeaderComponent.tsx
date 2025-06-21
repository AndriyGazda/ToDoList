import TaskControls from "./TaskControls/TaskControlsComponent";
import classes from "./HeaderComponent.module.css";

const HeaderComponent = () => {
  return (
    <>
      <div className={classes.header}>
        <h1>Task Manager</h1>
        <TaskControls />
      </div>
      <div className={classes.fullWidthLine} />
    </>
  );
};

export default HeaderComponent;
