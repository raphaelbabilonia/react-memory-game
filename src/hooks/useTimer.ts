import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerProps {
  initialTime?: number; // in milliseconds
  onTimeUp?: () => void;
  autoStart?: boolean;
}

interface UseTimerReturn {
  time: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  isRunning: boolean;
  formatTime: (format?: 'mm:ss' | 'hh:mm:ss') => string;
}

const useTimer = ({
  initialTime = 600000, // 10 minutes in milliseconds
  onTimeUp,
  autoStart = false,
}: UseTimerProps = {}): UseTimerReturn => {
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeUpRef = useRef<(() => void) | undefined>(onTimeUp);

  // Update callback ref when it changes
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  // Start the timer
  const start = useCallback(() => {
    if (isRunning || time <= 0) return;
    
    setIsRunning(true);
    
    intervalRef.current = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1000) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsRunning(false);
          
          if (onTimeUpRef.current) {
            onTimeUpRef.current();
          }
          
          return 0;
        }
        return prevTime - 1000; // Decrease by 1 second
      });
    }, 1000);
  }, [isRunning, time]);

  // Pause the timer
  const pause = useCallback(() => {
    if (!isRunning) return;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setIsRunning(false);
  }, [isRunning]);

  // Reset the timer
  const reset = useCallback((newTime?: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setTime(newTime !== undefined ? newTime : initialTime);
    setIsRunning(false);
  }, [initialTime]);

  // Format time to display
  const formatTime = useCallback((format: 'mm:ss' | 'hh:mm:ss' = 'mm:ss') => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (format === 'hh:mm:ss') {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }, [time]);

  // Auto-start the timer if specified
  useEffect(() => {
    if (autoStart) {
      start();
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoStart, start]);

  return {
    time,
    start,
    pause,
    reset,
    isRunning,
    formatTime,
  };
};

export default useTimer; 