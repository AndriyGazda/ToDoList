import { useEffect, useState } from "react";

export const useCountdown = (targetData: string) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!targetData) {
      setTimeLeft("");
      return;
    }

    const due = new Date(targetData);
    if (isNaN(due.getTime())) {
      setTimeLeft("Invalid date");
      return;
    }

    const updateTimeLeft = () => {
      const now = new Date();
      const diff = due.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Time's up!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    updateTimeLeft();

    const timer = setInterval(updateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [targetData]);

  return timeLeft;
};
