import { ModalComponent } from "../Modal/Modal";
import { Button, Input } from "@/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type {
  TaskFormModalProps,
  FormData,
} from "@/interface/taskFormModal.interface.ts";

const getCurrentDate = () => new Date().toISOString().split("T")[0];

const TaskFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  isEditable = false,
  onEditClick,
  initialTitle = "",
  initialDescription = "",
  initialPriority = "",
  initialStatus = "",
  initialDueDate = new Date().toISOString().split("T")[0],
  heading = "Task Form",
  submitLabel = "Submit",
}: TaskFormModalProps) => {
  const { register, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: {
      title: initialTitle,
      description: initialDescription,
      priority: initialPriority,
      status: initialStatus,
      dueDate: initialDueDate,
    },
  });

  const statusWatch = watch("status");

  useEffect(() => {
    if (isOpen) {
      reset({
        title: initialTitle,
        description: initialDescription,
        priority: initialPriority,
        status: initialStatus,
        dueDate: initialDueDate || getCurrentDate(),
      });
    }
  }, [
    isOpen,
    initialTitle,
    initialDescription,
    initialPriority,
    initialStatus,
    initialDueDate,
    reset,
  ]);

  const ourFormSubmit = (data: FormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <h2>{heading}</h2>

      <form onSubmit={handleSubmit(ourFormSubmit)}>
        <label htmlFor="titleTask">Title</label>
        <Input
          id="titleTask"
          type="text"
          disabled={!isEditable}
          {...register("title", { required: true })}
        />

        <label htmlFor="descriptionTask">Description</label>
        <textarea
          id="descriptionTask"
          rows={7}
          cols={40}
          disabled={!isEditable}
          {...register("description")}
        ></textarea>

        <label htmlFor="priorityTask">Priority</label>
        <select
          id="priorityTask"
          disabled={!isEditable}
          {...register("priority")}
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
                id="statusTaskDone"
                value="done"
                {...register("status")}
                disabled={!isEditable}
                checked={statusWatch === "done"}
              />
              <label htmlFor="statusTaskDone">Done</label>
            </>
          )}
          <Input
            type="radio"
            // name="statusTask"
            id="statusTaskInProgress"
            value="in-progress"
            {...register("status")}
            disabled={!isEditable}
            checked={statusWatch === "in-progress"}
          />
          <label htmlFor="statusTaskInProgress">In Progress</label>
          <Input
            type="radio"
            id="statusTaskPlanned"
            value="planned"
            {...register("status")}
            disabled={!isEditable}
            checked={statusWatch === "planned"}
          />
          <label htmlFor="statusTaskPlanned">Planned</label>
        </fieldset>

        <label htmlFor="dueDateTask">Due Date</label>
        <Input
          type="date"
          id="dueDateTask"
          defaultValue={getCurrentDate()}
          disabled={!isEditable}
          {...register("dueDate")}
        />

        <Button type="submit">{submitLabel}</Button>
      </form>
      {!isEditable && onEditClick && (
        <Button type="button" onClick={onEditClick}>
          Edit Task
        </Button>
      )}
    </ModalComponent>
  );
};

export default TaskFormModal;
