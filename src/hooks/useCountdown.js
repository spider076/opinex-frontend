import { useState, useEffect } from 'react';

export const useCountdown = (timestamp) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const startTime = Number(timestamp) * 1000; // Convert to milliseconds
      const endTime = startTime + (60 * 60 * 1000); // Add 1 hour
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
        minutes: Math.floor((difference / 1000 / 60) % 60),
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