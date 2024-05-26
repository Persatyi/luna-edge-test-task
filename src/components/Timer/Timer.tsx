import React, { useEffect, useState } from 'react';

interface ITimerProps {
  duration: number;
  onTimeUp: () => void;
  key: number;
}

const Timer: React.FC<ITimerProps> = ({ duration, onTimeUp, key }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, key]);

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
  }, [onTimeUp, key]);

  return (
    <div>
      Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
    </div>
  );
};

export default Timer;
