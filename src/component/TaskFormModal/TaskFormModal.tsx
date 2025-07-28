import { ModalComponent } from "../Modal/Modal";
import { Button, Input } from "@/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type {
  TaskFormModalProps,
  FormData,
} from "@/interface/taskFormModal.interface.ts";
import classes from "./TaskFormModal.module.css";

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
      <div className={classes.form}>
        <h2 className={classes.titleModalForm}>{heading}</h2>

        <form onSubmit={handleSubmit(ourFormSubmit)}>
          <div className={classes.wrapperForm}>
            <label htmlFor="titleTask">Title:</label>
            <Input
              id="titleTask"
              type="text"
              disabled={!isEditable}
              {...register("title", { required: true })}
            />
          </div>

          <div className={classes.wrapperForm}>
            <label htmlFor="descriptionTask">Description:</label>
            <textarea
              id="descriptionTask"
              rows={7}
              disabled={!isEditable}
              {...register("description")}
            ></textarea>
          </div>

          <div className={classes.wrapperForm}>
            <label htmlFor="priorityTask">Priority:</label>
            <select
              id="priorityTask"
              disabled={!isEditable}
              {...register("priority")}
            >
              <option value="" disabled hidden>
                Click to select a status
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className={classes.wrapperForm}>
            <label htmlFor="status">Task Status:</label>

            {!isEditable ? (
              // Режим перегляду
              <p className={classes.statusReadonly}>
                {initialStatus === "done"
                  ? "Done"
                  : initialStatus === "in-progress"
                    ? "In Progress"
                    : initialStatus === "planned"
                      ? "Planned"
                      : "No status"}
              </p>
            ) : (
              // Режим редагування
              <>
                <div className={classes.statusRadioBtnWrapper}>
                  <Input
                    type="radio"
                    id="statusTaskDone"
                    value="done"
                    {...register("status")}
                    checked={statusWatch === "done"}
                    className={classes.statusRadioBtn}
                  />
                  <label htmlFor="statusTaskDone" className={classes.statusRadioBtn}>
                    Done
                  </label>
                </div>

                <div className={classes.statusRadioBtnWrapper}>
                  <Input
                    type="radio"
                    id="statusTaskInProgress"
                    value="in-progress"
                    {...register("status")}
                    checked={statusWatch === "in-progress"}
                    className={classes.statusRadioBtn}
                  />
                  <label htmlFor="statusTaskInProgress" className={classes.statusRadioBtn}>
                    In Progress
                  </label>
                </div>

                <div className={classes.statusRadioBtnWrapper}>
                  <Input
                    type="radio"
                    id="statusTaskPlanned"
                    value="planned"
                    {...register("status")}
                    checked={statusWatch === "planned"}
                    className={classes.statusRadioBtn}
                  />
                  <label htmlFor="statusTaskPlanned" className={classes.statusRadioBtn}>
                    Planned
                  </label>
                </div>
              </>
            )}
          </div>

          <div className={classes.wrapperForm}>
            <label htmlFor="dueDateTask">Due Date:</label>
            <Input
              type="date"
              id="dueDateTask"
              defaultValue={getCurrentDate()}
              disabled={!isEditable}
              {...register("dueDate")}
            />
          </div>

          <div
            className={`${classes.btnWrapper} ${
              !isEditable && onEditClick ? classes.doubleBtn : classes.singleBtn
            }`}
          >
            {!isEditable && onEditClick ? (
              <Button
                type="button"
                className={classes.btnSubmitForm}
                onClick={onClose}
              >
                Back
              </Button>
            ) : (
              <Button type="submit" className={classes.btnSubmitForm}>
                {submitLabel}
              </Button>
            )}

            {!isEditable && onEditClick && (
              <Button
                type="button"
                onClick={onEditClick}
                className={classes.btnSubmitForm}
              >
                Edit Task
              </Button>
            )}
          </div>
        </form>
      </div>
    </ModalComponent>
  );
};

export default TaskFormModal;
