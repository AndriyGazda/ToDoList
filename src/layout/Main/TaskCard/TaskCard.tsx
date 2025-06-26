import { Button } from "../../../component/ui/Button";
import type { Task } from "../../../hooks/useTask";

import { useState } from "react";
import TaskFormModalComponent from "../../../component/TaskFormModalComponent/TaskFormModalComponent";

interface TaskCardProps {
  task: Task;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskCard = ({ task, onEditTask, onDeleteTask }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description || "No description"}</p>
      <p>Priority: {task.priority || "No description"}</p>
      <p>Status: {task.status || "No description"}</p>
      <p>Due Date: {task.dueDate || "No due date"}</p>
      <Button onClick={() => onDeleteTask(task.id)}> Delete </Button>
      <Button onClick={openModal}>Edit Task</Button>
      <TaskFormModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={(taskInfo: {
          title: string;
          description?: string;
          priority?: string;
          status?: string;
          dueDate?: string;
        }) =>
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
        initialDescription={task.description || "No description"}
        initialPriority={task.priority}
        initialStatus={task.status}
        initialDueDate={task.dueDate || new Date().toISOString().split("T")[0]}
        heading={`Edit Task ${task.title}`}
        submitLabel="Save"
      />
    </div>
  );
};

export default TaskCard;
