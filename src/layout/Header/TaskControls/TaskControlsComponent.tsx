import { Button } from "../../../component/ui/Button";
import ModalComponent from "../../../component/ModalComponent/ModalComponent";
import classes from "./TaskControlsComponent.module.css";
import { useState } from "react";
import { useRerender } from "../../../hooks/useRerender";

const TaskControls = () => {
  const render = useRerender();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  console.log("render");
  return (
    <div className={classes.taskControls}>
      <Button
        className={classes.taskControlsAddTask}
        type="button"
        onClick={openModal}
      >
        ➕ NEW TASK
      </Button>
      <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
        <h2>Форма або будь-який контент тут</h2>
      
      </ModalComponent>

      <div>
        <select className={classes.taskControlsSortSelect} name="sortTask">
          <option value="done">Sort by done</option>
          <option value="progress">Sort by progress</option>
          <option value="plans">Sort by plans</option>
        </select>
        <Button
          className={classes.taskControlsButtonUpdate}
          type="button"
          onClick={render}
        >
          Update (Іконка оновити)
        </Button>
      </div>
    </div>
  );
};

export default TaskControls;
