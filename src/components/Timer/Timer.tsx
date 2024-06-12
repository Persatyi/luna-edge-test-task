import React, { useEffect, useState } from 'react';

interface ITimerProps {
  duration: number;
  onTimeUp: () => void;
  updater: number;
}

const Timer: React.FC<ITimerProps> = ({ duration, onTimeUp, updater }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, updater]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp, updater]);

  return (
    <div>
      Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
    </div>
  );
};

export default Timer;
