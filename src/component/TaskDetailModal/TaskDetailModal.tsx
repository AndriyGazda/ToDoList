import classes from "./TaskDetailModal.module.css";
import { ModalComponent } from "@/component/Modal/Modal.tsx";
import { Button } from "@/ui";
import type { Task } from "@/interface/task.interface.ts";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onEditClick: () => void;
}

export const TaskDetailModal = ({
  isOpen,
  onClose,
  task,
  onEditClick,
}: TaskDetailModalProps) => {
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <div className={classes.taskDetail}>
        <h2 className={classes.title}>{task.title}</h2>
        <p className={classes.description}>
          <span className={classes.label}>Description: </span>
          {task.description || "No description"}
        </p>
        <p className={classes.priority}>
          <span className={classes.label}>Priority: </span>
          {task.priority || "No priority"}
        </p>
        <p className={classes.status}>
          <span className={classes.label}>Status: </span>
          {task.status || "No status"}
        </p>
        <p className={classes.date}>
          <span className={classes.label}>Due Date: </span>
          {task.dueDate || "No due date"}
        </p>
      </div>

      <div className={classes.buttons}>
        <Button onClick={onClose} className={classes.closeButton}>
          Close
        </Button>
        <Button onClick={onEditClick} className={classes.editButton}>
          Edit
        </Button>
      </div>
    </ModalComponent>
  );
};
