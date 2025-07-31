import { Button } from "@/ui";
import classes from "./TaskCard.module.css";
import { memo, useState } from "react";
import { TaskFormModal } from "@/component/TaskFormModal";
import { useTaskStore } from "@/store/useTaskStore";
import { useCountdown } from "@/hooks/useCountdown.ts";
import type { Task } from "@/interface/task.interface";

interface TaskCardProps {
  task: Task;
}

const TaskCard = memo(({ task }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const timeLeft = useCountdown(task.dueDate);

  const onEditTask = useTaskStore((state) => state.editTask);
  const onDeleteTask = useTaskStore((state) => state.deleteTask);

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditable(false);
  };
  const closeModal = () => setIsModalOpen(false);

  console.log("TaskCard render  zustand");

  return (
    <div className={classes.taskCard} id={`task-${task.id}`}>
      <div>
        <h3 className={classes.title}>{task.title}</h3>
        <p className={classes.description}>
          <span className={classes.label}> Description: </span>
          {task.description
            ? task.description.length > 80
              ? `${task.description.slice(0, 80)} ...`
              : task.description
            : ""}
        </p>
        <p className={classes.priority}>
          <span className={classes.label}> Priority: </span>
          {task.priority}
        </p>
        <p className={classes.status}>
          <span className={classes.label}> Status: </span>
          {task.status || "No description"}
        </p>
        <p className={classes.date}>
          <span className={classes.label}> Due Date: </span> {task.dueDate}
        </p>
        <p className={classes.date}>
          <span className={classes.label}> Time Left: </span> {timeLeft}
        </p>
      </div>

      <div className={classes.buttons}>
        <Button
          onClick={() => onDeleteTask(task.id)}
          className={classes.buttonDelete}
        >
          Delete
        </Button>

        <Button onClick={openModal} className={classes.buttonDetail}>
          Detail task
        </Button>
      </div>
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={(taskInfo) =>
          onEditTask({
            ...task,
            title: taskInfo.title,
            description: taskInfo.description,
            priority: taskInfo.priority,
            status: taskInfo.status,
            dueDate: taskInfo.dueDate,
          })
        }
        initialTitle={task.title}
        initialDescription={task.description}
        initialPriority={task.priority}
        initialStatus={task.status || "No description"}
        initialDueDate={task.dueDate}
        heading={`Edit Task ${task.title}`}
        submitLabel="Save"
        isEditable={isEditable}
        onEditClick={() => setIsEditable(true)}
      />

      {/*<TaskDetailModal isOpen={isModalOpen} onClose={closeModal} task={task} onEditClick={() => setIsEditable(true)} />*/}
    </div>
  );
});

export default TaskCard;
