export const Input = ({
  children,
  ...inputProps
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...inputProps}>{children}</input>;
};
