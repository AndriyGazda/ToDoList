import ModalComponent from "../../component/ModalComponent/ModalComponent";

import { Button } from "../../component/ui/Button";
import { Input } from "../../component/ui/Input";
import { useRef, useEffect } from "react";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskInfo: { title: string; description?: string }) => void;
  initialTitle?: string;
  initialDescription?: string;
  heading?: string;
  submitLabel?: string;
}

const TaskFormModalComponent = ({
  isOpen,
  onClose,
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  heading = "Task Form",
  submitLabel = "Submit",
}: TaskFormModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && titleRef.current) {
      titleRef.current.value = initialTitle;
      titleRef.current.focus();
    }
  }, [isOpen, initialTitle]);
  useEffect(() => {
    if (isOpen && descriptionRef.current) {
      descriptionRef.current.value = initialDescription;
    }
  }, [isOpen, initialDescription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();

    if (!title) return;

    onSubmit({ title, description });
    onClose();
  };

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <h2>{heading}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titleTask">Title</label>
        <Input name="titleTask" id="titleTask" type="text" ref={titleRef} />

        <label htmlFor="descriptionTask">Description</label>
        <textarea
          name="descriptionTask"
          id="descriptionTask"
          ref={descriptionRef}
          rows={7}
          cols={40}
        ></textarea>

        <label htmlFor="priorityTask">Priority</label>
        <select name="priorityTask" id="priorityTask">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <fieldset>
          <legend>Task Status</legend>
          <label htmlFor="statusTask">Status</label>
          {submitLabel === "Save" && (
            <>
              <input
                type="radio"
                name="statusTask"
                id="statusTaskDone"
                value="done"
              />
              <label htmlFor="statusTaskDone">Done</label>
            </>
          )}
          <input
            type="radio"
            name="statusTask"
            id="statusTaskInProgress"
            value="in-progress"
          />
          <label htmlFor="statusTaskInProgress">In Progress</label>
          <input
            type="radio"
            name="statusTask"
            id="statusTaskPlanned"
            value="planned"
          />
          <label htmlFor="statusTaskPlanned">Planned</label>
        </fieldset>

        <label htmlFor="dueDateTask">Due Date</label>
        <input
          type="date"
          name="dueDateTask"
          id="dueDateTask"
          defaultValue={new Date().toISOString().split("T")[0]}
        />

        <Button type="submit">{submitLabel}</Button>
      </form>
    </ModalComponent>
  );
};

export default TaskFormModalComponent;
