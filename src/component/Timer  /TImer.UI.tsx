import { memo } from "react";
import { useCountdown } from "@/hooks/useCountdown.ts";

interface TimerProps {
  wrapperClassName?: string;
  labelClassName?: string;
  children: string;
}

export const Timer = memo(
  ({ wrapperClassName, labelClassName, children }: TimerProps) => {
    const timeLeft = useCountdown(children);

    return (
      <p className={wrapperClassName}>
        <span className={labelClassName}> Time Left: </span> {timeLeft}
      </p>
    );
  },
);
