// import { useState } from "react";
import classes from "./ModalComponent.module.css";
import type { ReactNode } from "react";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalComponent = ({ isOpen, onClose, children }: ModalComponentProps) => {
  if (!isOpen) return null;

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <button onClick={onClose} className={classes.closeBtn}>
          Закрити
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
