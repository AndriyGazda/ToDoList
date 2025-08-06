import TaskControls from "./TaskControls/TaskControls";
import classes from "./Header.module.css";

const HeaderComponent = () => {
  console.log("HeaderComponent render");
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
