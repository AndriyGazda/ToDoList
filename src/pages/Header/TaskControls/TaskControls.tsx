import { Button } from "@/ui";
import TaskFormModal from "@/component/TaskFormModal/TaskFormModal";

import classes from "./TaskControls.module.css";
import { useState } from "react";

import { useTaskStore } from "@/store/useTaskStore";

const TaskControls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const onAddTask = useTaskStore((state) => state.addTask);
  const sortTask = useTaskStore((state) => state.sortTasks);

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditable(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const onSortTask = (event: React.ChangeEvent<HTMLSelectElement>) =>
    sortTask(event.target.value);
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
        heading="New Task"
        submitLabel="Add Task"
      />

      <div>
        <select
          className={classes.taskControlsSortSelect}
          name="sortTask"
          onChange={onSortTask}
        >
          <option value="">No sorting</option>
          <option value="status">Sort by status</option>
          <option value="priority">Sort by priority</option>
          <option value="date">Sort by date</option>
        </select>
      </div>
    </div>
  );
};
export default TaskControls;
