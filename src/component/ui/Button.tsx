const Button = ({
  children,
  ...buttonProps
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...buttonProps}>{children}</button>;
};

export default Button;
