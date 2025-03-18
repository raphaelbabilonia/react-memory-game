import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TimerDisplay } from '../styles/StyledComponents';

interface TimerProps {
  time: number; // in milliseconds
  isRunning: boolean;
}

const Timer: React.FC<TimerProps> = ({ time, isRunning }) => {
  const [displayTime, setDisplayTime] = useState<string>(formatTime(time));
  
  // Format time from milliseconds to MM:SS
  function formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  useEffect(() => {
    setDisplayTime(formatTime(time));
  }, [time]);
  
  // Animation for pulsing when time is running low
  const isPulsing = isRunning && time <= 60000; // Less than 1 minute and timer is running
  
  return (
    <TimerDisplay
      as={motion.div}
      animate={isPulsing ? { scale: [1, 1.05, 1] } : {}}
      transition={isPulsing ? { repeat: Infinity, duration: 1 } : {}}
      style={{ 
        color: time <= 30000 ? '#f44336' : (time <= 60000 ? '#ff9800' : undefined),
        opacity: isRunning ? 1 : 0.7
      }}
      aria-label={`Time remaining: ${displayTime}`}
      aria-live="polite"
    >
      {displayTime}
    </TimerDisplay>
  );
};

export default Timer; 