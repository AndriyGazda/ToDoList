import { Button } from "../../../ui/Button";
import type { Task } from "../../../hooks/useTask";
import classes from "./TaskCard.module.css";

import { memo, useState } from "react";
import TaskFormModalComponent from "../../../component/TaskFormModal/TaskFormModal";
import { useTaskContext } from "../../../context/TaskContext";

interface TaskCardProps {
  task: Task;
}

const TaskCard = memo(({ task }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const { editTask, deleteTask } = useTaskContext();

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditable(false);
  };
  const closeModal = () => setIsModalOpen(false);

  console.log("TaskCard render");

  return (
    <div className={classes.taskCard} id={`task-${task.id}`}>
      <h3 className={classes.title}>{task.title}</h3>
      <p className={classes.description}>
        <span className={classes.label}> Description: </span>
        {task.description || "No description"}
      </p>
      <p className={classes.priority}>
        <span className={classes.label}> Priority: </span>
        {task.priority || "No description"}
      </p>
      <p className={classes.status}>
        <span className={classes.label}> Status: </span>
        {task.status || "No description"}
      </p>
      <p className={classes.date}>
        <span className={classes.label}> Due Date: </span>{" "}
        {task.dueDate || "No due date"}
      </p>
      <Button
        onClick={() => deleteTask(task.id)}
        className={classes.buttonDelaete}
      >
        Delete
      </Button>
      <Button onClick={openModal} className={classes.buttonDetail}>
        Detail task
      </Button>

      <TaskFormModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={(taskInfo) =>
          editTask({
            ...task,
            title: taskInfo.title,
            description: taskInfo.description,
            priority: taskInfo.priority,
            status: taskInfo.status,
            dueDate: taskInfo.dueDate,
          })
        }
        initialTitle={task.title}
        initialDescription={task.description || "No description"}
        initialPriority={task.priority}
        initialStatus={task.status}
        initialDueDate={task.dueDate || new Date().toISOString().split("T")[0]}
        heading={`Edit Task ${task.title}`}
        submitLabel="Save"
        isEditable={isEditable}
        onEditClick={() => setIsEditable(true)}
      />
    </div>
  );
});

export default TaskCard;
