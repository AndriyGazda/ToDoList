import { Button } from "../../../ui/Button";

import classes from "./TaskControls.module.css";
import { useState } from "react";

import TaskFormModal from "../../../component/TaskFormModal/TaskFormModal";
import { useTaskContext } from "../../../context/TaskContext";

const TaskControls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const { addTask } = useTaskContext();

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditable(true);
  };
  const closeModal = () => setIsModalOpen(false);

  console.log("TaskControls render");
  return (
    <div className={classes.taskControls}>
      <Button
        className={classes.taskControlsAddTask}
        type="button"
        onClick={openModal}
      >
        ➕ NEW TASK
      </Button>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={(taskInfo) =>
          addTask({
            id: crypto.randomUUID(),
            title: taskInfo.title,
            description: taskInfo.description,
            status: taskInfo.status,
            priority: taskInfo.priority,
            dueDate: taskInfo.dueDate,
          })
        }
        isEditable={isEditable}
        heading="Create New Task"
        submitLabel="Add Task"
      />

      <div>
        <select className={classes.taskControlsSortSelect} name="sortTask">
          <option value="done">Sort by done</option>
          <option value="progress">Sort by progress</option>
          <option value="plans">Sort by plans</option>
        </select>
      </div>
    </div>
  );
};
export default TaskControls;
