import Button from "../../component/ui/Button";
import classes from "./TaskControlsComponent.module.css";

const TaskControls = () => {
  return (
    <div className={classes.taskControls}>
      <Button className={classes.taskControlsAddTask} type="button">
        + NEW TASK
      </Button>
      <select className={classes.taskControlsSortSelect}>
        <option value="">Sort by done</option>
        <option value="">Sort by progress</option>
        <option value="">Sort by plans</option>
      </select>
      <Button className={classes.taskControlsButtonUpdate} type="button">
        Update (Іконка оновити)
      </Button>
    </div>
  );
};

export default TaskControls;
