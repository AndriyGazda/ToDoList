import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((inputProps, ref) => {
  return <input ref={ref} {...inputProps} />;
});
