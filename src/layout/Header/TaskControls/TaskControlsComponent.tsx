import { Button } from "../../../component/ui/Button";

import classes from "./TaskControlsComponent.module.css";
import { useState } from "react";

import type { Task } from "../../../hooks/useTask";
import TaskFormModalComponent from "../../../component/TaskFormModalComponent/TaskFormModalComponent";

interface TaskControlsProps {
  onAddTask: (task: Task) => void;
}

const TaskControls = ({ onAddTask }: TaskControlsProps) => {
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

      <TaskFormModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={(taskInfo: { title: string; description?: string }) =>
          onAddTask({
            id: crypto.randomUUID(),
            title: taskInfo.title,
            description: taskInfo.description || "",
          })
        }
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
