import { Button } from "../../../ui/Button";
import TaskFormModal from "../../../component/TaskFormModal/TaskFormModal";

import classes from "./TaskControls.module.css";
import { memo, useState } from "react";

import { useTaskStore } from "../../../store/useTaskStore";

const TaskControls = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const onAddTask = useTaskStore((state) => state.addTask);

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditable(true);
  };
  const closeModal = () => setIsModalOpen(false);

  console.log("TaskControls render zustand");
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
          onAddTask({
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
});
export default TaskControls;
