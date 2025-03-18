import React from 'react';
import { motion } from 'framer-motion';
import { NumpadButton, NumpadContainer } from '../styles/StyledComponents';
import styled from 'styled-components';

interface NumpadProps {
  onNumberClick: (number: number) => void;
  disabled?: boolean;
}

const NumpadRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (orientation: landscape) {
    gap: 0.6rem;
    margin-bottom: 0.6rem;
  }
`;

const Numpad: React.FC<NumpadProps> = ({ onNumberClick, disabled = false }) => {
  // Animation variants for framer motion
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, y: -5 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5, scale: 1 },
  };

  const handleButtonClick = (number: number) => {
    if (!disabled) {
      onNumberClick(number);
    }
  };

  return (
    <NumpadContainer>
      {/* First row: 1,2,3 */}
      <NumpadRow>
        {[1, 2, 3].map(num => (
          <NumpadButton
            key={num}
            aria-label={`Number ${num}`}
            disabled={disabled}
            onClick={() => handleButtonClick(num)}
            as={motion.button}
            initial="initial"
            whileHover={disabled ? "disabled" : "hover"}
            whileTap={disabled ? "disabled" : "tap"}
            variants={buttonVariants}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {num}
          </NumpadButton>
        ))}
      </NumpadRow>
      
      {/* Second row: 4,5,6 */}
      <NumpadRow>
        {[4, 5, 6].map(num => (
          <NumpadButton
            key={num}
            aria-label={`Number ${num}`}
            disabled={disabled}
            onClick={() => handleButtonClick(num)}
            as={motion.button}
            initial="initial"
            whileHover={disabled ? "disabled" : "hover"}
            whileTap={disabled ? "disabled" : "tap"}
            variants={buttonVariants}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {num}
          </NumpadButton>
        ))}
      </NumpadRow>
      
      {/* Third row: 7,8,9 */}
      <NumpadRow>
        {[7, 8, 9].map(num => (
          <NumpadButton
            key={num}
            aria-label={`Number ${num}`}
            disabled={disabled}
            onClick={() => handleButtonClick(num)}
            as={motion.button}
            initial="initial"
            whileHover={disabled ? "disabled" : "hover"}
            whileTap={disabled ? "disabled" : "tap"}
            variants={buttonVariants}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {num}
          </NumpadButton>
        ))}
      </NumpadRow>
      
      {/* Fourth row: 0 (centered) */}
      <NumpadRow>
        <NumpadButton
          key={0}
          aria-label="Number 0"
          disabled={disabled}
          onClick={() => handleButtonClick(0)}
          as={motion.button}
          initial="initial"
          whileHover={disabled ? "disabled" : "hover"}
          whileTap={disabled ? "disabled" : "tap"}
          variants={buttonVariants}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          0
        </NumpadButton>
      </NumpadRow>
    </NumpadContainer>
  );
};

export default Numpad; 