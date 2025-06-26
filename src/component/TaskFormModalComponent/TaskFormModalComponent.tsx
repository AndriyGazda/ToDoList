import ModalComponent from "../../component/ModalComponent/ModalComponent";

import { Button } from "../../component/ui/Button";
import { Input } from "../../component/ui/Input";
import { useRef, useEffect } from "react";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskInfo: {
    title: string;
    description?: string;
    priority?: string;
    status?: string;
    dueDate?: string;
  }) => void;
  initialTitle?: string;
  initialDescription?: string;
  initialPriority?: string;
  initialStatus?: string;
  initialDueDate?: string;
  heading?: string;
  submitLabel?: string;
}
interface TaskFormModalRef {
  titleRef?: HTMLInputElement | null;
  descriptionRef?: HTMLTextAreaElement | null;
  priorityRef?: HTMLSelectElement | null;
  statusRef?: HTMLInputElement | null;
  dueDateRef?: HTMLInputElement | null;
}

const TaskFormModalComponent = ({
  isOpen,
  onClose,
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  initialPriority = "",
  initialStatus = "",
  initialDueDate = new Date().toISOString().split("T")[0],
  heading = "Task Form",
  submitLabel = "Submit",
}: TaskFormModalProps) => {
  const formRef = useRef<TaskFormModalRef>({});

  useEffect(() => {
    if (isOpen) {
      if (formRef.current.titleRef) {
        formRef.current.titleRef.value = initialTitle;
        formRef.current.titleRef.focus();
      }
      if (formRef.current.descriptionRef) {
        formRef.current.descriptionRef.value = initialDescription;
      }
      if (formRef.current.priorityRef) {
        formRef.current.priorityRef.value = initialPriority || "low";
      }
      if (formRef.current.statusRef) {
        formRef.current.statusRef.value = initialStatus;
      }
      if (formRef.current.dueDateRef) {
        formRef.current.dueDateRef.value = initialDueDate;
      }
    }
  }, [
    isOpen,
    initialTitle,
    initialDescription,
    initialPriority,
    initialStatus,
    initialDueDate,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = formRef.current.titleRef?.value.trim();
    const description = formRef.current.descriptionRef?.value.trim();
    const priority = formRef.current.priorityRef?.value;

    const status = document.querySelector<HTMLInputElement>(
      'input[name="statusTask"]:checked'
    )?.value;

    const dueDate = formRef.current.dueDateRef?.value;

    if (!title) return;

    onSubmit({ title, description, priority, status, dueDate });
    onClose();
  };

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <h2>{heading}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titleTask">Title</label>
        <Input
          name="titleTask"
          id="titleTask"
          type="text"
          ref={(el) => {
            formRef.current.titleRef = el;
          }}
        />

        <label htmlFor="descriptionTask">Description</label>
        <textarea
          name="descriptionTask"
          id="descriptionTask"
          ref={(el) => {
            formRef.current.descriptionRef = el;
          }}
          rows={7}
          cols={40}
        ></textarea>

        <label htmlFor="priorityTask">Priority</label>
        <select
          name="priorityTask"
          id="priorityTask"
          ref={(el) => {
            formRef.current.priorityRef = el;
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <fieldset>
          <legend>Task Status</legend>
          <label htmlFor="statusTask">Status</label>
          {submitLabel === "Save" && (
            <>
              <Input
                type="radio"
                name="statusTask"
                id="statusTaskDone"
                value="done"
                defaultChecked={initialStatus === "done"}
              />
              <label htmlFor="statusTaskDone">Done</label>
            </>
          )}
          <Input
            type="radio"
            name="statusTask"
            id="statusTaskInProgress"
            value="in-progress"
            defaultChecked={initialStatus === "in-progress"}
          />
          <label htmlFor="statusTaskInProgress">In Progress</label>
          <Input
            type="radio"
            name="statusTask"
            id="statusTaskPlanned"
            value="planned"
            defaultChecked={initialStatus === "planned"}
          />
          <label htmlFor="statusTaskPlanned">Planned</label>
        </fieldset>

        <label htmlFor="dueDateTask">Due Date</label>
        <Input
          type="date"
          name="dueDateTask"
          id="dueDateTask"
          defaultValue={new Date().toISOString().split("T")[0]}
          ref={(el) => {
            formRef.current.dueDateRef = el;
          }}
        />

        <Button type="submit">{submitLabel}</Button>
      </form>
    </ModalComponent>
  );
};

export default TaskFormModalComponent;
