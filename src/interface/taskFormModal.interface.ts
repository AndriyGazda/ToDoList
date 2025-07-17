import type { Task } from "@/interface/task.interface.ts";

export interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskInfo: Omit<Task, "id">) => void;
  isEditable?: boolean;
  onEditClick?: () => void;
  initialTitle?: string;
  initialDescription?: string;
  initialPriority?: string;
  initialStatus?: string;
  initialDueDate?: string;
  heading?: string;
  submitLabel?: string;
}

export interface FormData {
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}
