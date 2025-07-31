import { ModalComponent } from "../Modal/Modal";
import { Button, Input } from "@/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { statuses } from "@/helpers/variables";
import type { TaskFormModalProps, FormData } from "@/interface";
import classes from "./TaskFormModal.module.css";
import { getDaysAndHoursLeft } from "@/helpers/functions";

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
  initialDueDate = "No date",

  heading = "Task Form",
  submitLabel = "Submit",
}: TaskFormModalProps) => {
  const DefaultValues = {
    defaultValues: {
      title: initialTitle,
      description: initialDescription,
      priority: initialPriority,
      status: initialStatus,
      dueDate: initialDueDate,
    },
  };

  const { register, handleSubmit, reset, watch, formState } =
    useForm<FormData>(DefaultValues);
  const { errors } = formState;
  const statusWatch = watch("status");

  const dueDateWatch = watch("dueDate");

  const isBackMode = !isEditable && onEditClick;

  useEffect(() => {
    if (isOpen) {
      reset({
        title: initialTitle,
        description: initialDescription,
        priority: initialPriority,
        status: initialStatus,
        dueDate: initialDueDate,
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
  const timeLeft = getDaysAndHoursLeft(dueDateWatch);

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <div className={classes.form}>
        <h2 className={classes.titleModalForm}>{heading}</h2>

        <form onSubmit={handleSubmit(ourFormSubmit)}>
          <div className={classes.wrapperForm}>
            <label htmlFor="titleTask" className={classes.labelForm}>
              Title:
            </label>
            <Input
              className={`${classes.inputTitle} ${errors.title && classes.errorValidate}`}
              id="titleTask"
              type="text"
              disabled={!isEditable}
              {...register("title", {
                required: {
                  value: true,
                  message: "Task name is required. Please enter a task name.",
                },
              })}
            />
            <p className={classes.errorMessage}>{errors.title?.message}</p>
          </div>

          <div className={classes.wrapperForm}>
            <label htmlFor="descriptionTask" className={classes.labelForm}>
              Description:
            </label>
            <textarea
              className={`${classes.textareaDescription} ${errors.description && classes.errorValidate}`}
              id="descriptionTask"
              rows={7}
              disabled={!isEditable}
              {...register("description", {
                required: {
                  value: true,
                  message:
                    "Description is required. Please enter a description.",
                },
              })}
            ></textarea>
            <p className={classes.errorMessage}>
              {errors.description?.message}
            </p>
          </div>

          <div className={classes.wrapperForm}>
            <label htmlFor="priorityTask" className={classes.labelForm}>
              Priority:
            </label>
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
            <label htmlFor="status" className={classes.labelForm}>
              Task Status:
            </label>

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
                {statuses.map((status) => (
                  <label
                    key={status.value}
                    className={`${classes.statusRadioBtn} ${classes.labelForm} ${
                      statusWatch === status.value ? classes.active : ""
                    }`}
                  >
                    <input
                      type="radio"
                      value={status.value}
                      {...register("status")}
                      className={classes.hiddenRadio}
                    />
                    {status.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className={classes.wrapperForm}>
            <label htmlFor="dueDateTask" className={classes.labelForm}>
              Due Date:
            </label>
            <Input
              type="datetime-local"
              id="dueDateTask"
              disabled={!isEditable}
              {...register("dueDate")}
              className={`${classes.inputDate} -`}
            />
            {dueDateWatch && dueDateWatch !== "No date" && (
              <p className={classes.dataTimeInterval}>
                {timeLeft
                  ? `Left Time: ${timeLeft} `
                  : "Василь?? Неможливо вибрати дату в минулому."}
              </p>
            )}
          </div>

          <div
            className={`${classes.btnWrapper} ${
              !isEditable && onEditClick ? classes.doubleBtn : classes.singleBtn
            }`}
          >
            {
              <Button
                type={isBackMode ? "button" : "submit"}
                className={classes.btnSubmitForm}
                onClick={isBackMode ? onClose : undefined}
              >
                {isBackMode ? "Back" : submitLabel}
              </Button>
            }

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
