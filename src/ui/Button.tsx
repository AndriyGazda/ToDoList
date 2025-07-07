export const Button = ({
  children,
  ...buttonProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...buttonProps}>{children}</button>;
};
