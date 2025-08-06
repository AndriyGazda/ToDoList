import classes from "./Button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  unstyled?: boolean;
}

export const Button = ({
  children,
  className = "",
  unstyled = false,
  ...buttonProps
}: Props) => {
  const combinedClassName = unstyled
    ? className
    : `${classes.button} ${className}`;

  return (
    <button {...buttonProps} className={combinedClassName}>
      {children}
    </button>
  );
};
