import { useState, useEffect } from 'react';

export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const useCountdown = (timestamp: number | string): TimeLeft => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const startTime = Number(timestamp) * 1000; // Convert to milliseconds
      const endTime = startTime + (60 * 60 * 1000); // Add 1 hour (assuming question duration is 1 hour)
      const now = Date.now();
      const difference = endTime - now;

      if (difference <= 0) {
        return {
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        };
      }

      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60), // Corrected calculation
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timestamp]);

  return timeLeft;
}; 