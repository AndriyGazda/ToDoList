import { forwardRef } from "react";
import classes from "./Input.module.css";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...inputProps }, ref) => {
  return (
    <input
      ref={ref}
      {...inputProps}
      className={`${classes.input} ${className}`}
    />
  );
});
