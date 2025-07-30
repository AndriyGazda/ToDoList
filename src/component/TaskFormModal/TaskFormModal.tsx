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
  const { register, handleSubmit, reset, watch, formState } = useForm<FormData>(
    {
      defaultValues: {
        title: initialTitle,
        description: initialDescription,
        priority: initialPriority,
        status: initialStatus,
        dueDate: initialDueDate,
      },
    },
  );
  const { errors } = formState;

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
            <label htmlFor="titleTask" className={classes.labelForm}>Title:</label>
            <Input
              className={ `${classes.inputTitle} ${errors.title && classes.errorValidate}`}
              id="titleTask"
              type="text"
              disabled={!isEditable}
              {...register("title", {
                required: {
                  value: true,
                  message:
                    "Task name is required. Please enter a task name.",
                },
              })}
            />
            <p className={classes.errorMessage}>{errors.title?.message}</p>
          </div>

          <div className={classes.wrapperForm}>
            <label htmlFor="descriptionTask" className={classes.labelForm}>Description:</label>
            <textarea
              className={`${classes.textareaDescription} ${errors.description && classes.errorValidate}`}
              id="descriptionTask"
              rows={7}
              disabled={!isEditable}
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is required. Please enter a description.",
                }})}
            ></textarea>
            <p className={classes.errorMessage}>{errors.description?.message}</p>
          </div>

          <div className={classes.wrapperForm}>
            <label htmlFor="priorityTask" className={classes.labelForm}>Priority:</label>
            <select
              className={`${classes.selectPriority} ${errors.priority && classes.errorValidate}`}
              id="priorityTask"
              disabled={!isEditable}
              {...register("priority", {
                required: { value: true, message: "Priority is required" },
              })}
            >
              <option value="" disabled hidden>
                Click to select a status
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <p className={classes.errorMessage}>{errors.priority?.message}</p>

          </div>

          <div className={classes.wrapperForm}>
            <label htmlFor="status" className={classes.labelForm}>Task Status:</label>

            {!isEditable ? (
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
              <div className={classes.statusRadioGroup}>
                {[
                  { value: "done", label: "Done" },
                  { value: "in-progress", label: "In Progress" },
                  { value: "planned", label: "Planned" },
                ].map((statusOption) => (
                  <label
                    key={statusOption.value}
                    className={`${classes.statusRadioBtn} ${classes.labelForm} ${
                      statusWatch === statusOption.value ? classes.active : ""
                    }`}

                  >
                    <input
                      type="radio"
                      value={statusOption.value}
                      {...register("status")}
                      className={classes.hiddenRadio}
                    />
                    {statusOption.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className={classes.wrapperForm}>
            <label htmlFor="dueDateTask" className={classes.labelForm}>Due Date:</label>
            <Input
              type="date"
              id="dueDateTask"
              defaultValue={getCurrentDate()}
              disabled={!isEditable}
              {...register("dueDate")}
              className={`${classes.inputDate} ${errors.dueDate && classes.errorInput}`}
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
