import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NumberDisplay as StyledNumberDisplay, NumberDisplayContainer } from '../styles/StyledComponents';

interface NumberDisplayProps {
  number: number | null;
  onAnimationComplete?: () => void;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ 
  number, 
  onAnimationComplete 
}) => {
  const isLandscape = useRef(window.matchMedia('(orientation: landscape)').matches);
  
  // Update landscape detection when orientation changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(orientation: landscape)');
    const handleOrientationChange = (e: MediaQueryListEvent) => {
      isLandscape.current = e.matches;
    };
    
    mediaQuery.addEventListener('change', handleOrientationChange);
    return () => mediaQuery.removeEventListener('change', handleOrientationChange);
  }, []);
  
  // Animation variants for numbers
  const numberVariants = {
    initial: { 
      scale: 0,
      opacity: 0,
      rotateY: -180,
    },
    animate: { 
      scale: 1,
      opacity: 1,
      rotateY: 0,
    },
    exit: { 
      scale: 0,
      opacity: 0,
      rotateY: 180,
    }
  };
  
  // Animations must complete on number change for proper sequence display
  useEffect(() => {
    if (onAnimationComplete && number !== null) {
      const timeout = setTimeout(onAnimationComplete, 800);
      return () => clearTimeout(timeout);
    }
  }, [number, onAnimationComplete]);
  
  return (
    <NumberDisplayContainer>      
      <AnimatePresence mode="wait">
        {number !== null && (
          <StyledNumberDisplay
            key={number === -1 ? 'ready' : number}
            as={motion.div}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={numberVariants}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 150,
            }}
            style={number === -1 ? { 
              fontSize: isLandscape.current ? '1.5rem' : '2rem', 
              width: isLandscape.current ? '180px' : '220px',
              whiteSpace: 'nowrap'
            } : undefined}
            aria-live="assertive"
            aria-label={number === -1 ? 'Preparati' : `Numero ${number}`}
          >
            {number === -1 ? 'PREPARATI!' : number}
          </StyledNumberDisplay>
        )}
      </AnimatePresence>
    </NumberDisplayContainer>
  );
};

export default NumberDisplay; 