import { Button } from "@/ui";
import classes from "./Modal.module.css";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { X } from "lucide-react";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const ModalComponent = ({
  isOpen,
  onClose,
  children,
}: ModalComponentProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(classes.modalOpen);
    } else {
      document.body.classList.remove(classes.modalOpen);
    }
    return () => document.body.classList.remove(classes.modalOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  console.log("ModalComponent render");
  return (
    <div className={classes.overlay} onClick={onClose}>
      <div
        className={classes.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <Button onClick={onClose} className={classes.closeBtn}>
          <X className={classes.closeBtnIcon} size={47} />
        </Button>
        {children}
      </div>
    </div>
  );
};
