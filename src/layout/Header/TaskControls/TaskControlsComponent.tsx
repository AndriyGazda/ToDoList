import { Button } from "../../../component/ui/Button";
import { Input } from "../../../component/ui/Input";
import ModalComponent from "../../../component/ModalComponent/ModalComponent";

import classes from "./TaskControlsComponent.module.css";
import { useRef, useState } from "react";
import { useRerender } from "../../../hooks/useRerender";

import type { Task } from "../../../hooks/useTask";

interface TaskControlsProps {
  onAddTask: (task: Task) => void;
}

const TaskControls = ({ onAddTask }: TaskControlsProps) => {
  const render = useRerender();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value.trim() || "";
    if (!title) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: "",
    };

    onAddTask(newTask);
    if (titleRef.current) titleRef.current.value = "";

    setIsModalOpen(false);
  };

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
        <form action="" onSubmit={handleSubmit}>
          <Input type="text" placeholder="Task title" ref={titleRef} />
          <Button type="submit">Add</Button>
        </form>
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
