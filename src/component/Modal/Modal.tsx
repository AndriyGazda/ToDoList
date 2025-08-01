import { Button } from "../../ui/Button";
import classes from "./Modal.module.css";
import type { ReactNode } from "react";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalComponent = ({ isOpen, onClose, children }: ModalComponentProps) => {
  if (!isOpen) return null;

  console.log("ModalComponent render");
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <Button onClick={onClose} className={classes.closeBtn}>
          Закрити
        </Button>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
