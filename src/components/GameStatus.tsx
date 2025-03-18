import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ErrorMessage, 
  SuccessMessage,
  GameOverContainer,
  GameOverMessage,
  FinalScore,
  RestartButton
} from '../styles/StyledComponents';

interface GameStatusProps {
  status: 'initial' | 'idle' | 'display' | 'input' | 'success' | 'failure' | 'gameover';
  score: number;
  onRestart: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ status, score, onRestart }) => {
  // Get appropriate message based on status
  const getMessage = () => {
    switch (status) {
      case 'success':
        return 'Corretto! Preparati per la prossima sequenza...';
      case 'failure':
        return 'Sequenza sbagliata! Il gioco ricomincerà...';
      case 'display':
        return 'Memorizza la sequenza...';
      case 'input':
        return 'Inserisci la sequenza che hai memorizzato';
      case 'initial':
        return ''; // No message in initial state
      default:
        return '';
    }
  };
  
  // Animation variants
  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  const gameOverVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  // Handle aria-live announcements for accessibility
  useEffect(() => {
    // This would be handled by screen readers through aria-live regions
  }, [status]);
  
  // Render success/failure message
  const renderMessage = () => {
    const message = getMessage();
    
    if (status === 'success') {
      return (
        <SuccessMessage
          as={motion.div}
          variants={messageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key="success"
          aria-live="polite"
        >
          {message}
        </SuccessMessage>
      );
    }
    
    if (status === 'failure') {
      return (
        <ErrorMessage
          as={motion.div}
          variants={messageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key="failure"
          aria-live="assertive"
        >
          {message}
        </ErrorMessage>
      );
    }
    
    if (message) {
      return (
        <SuccessMessage
          as={motion.div}
          variants={messageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          key="info"
          aria-live="polite"
        >
          {message}
        </SuccessMessage>
      );
    }
    
    return null;
  };
  
  // Don't render anything if in initial state
  if (status === 'initial') {
    return null;
  }
  
  return (
    <>
      {/* Regular status messages */}
      <AnimatePresence mode="wait">
        {renderMessage()}
      </AnimatePresence>
      
      {/* Game over overlay */}
      <AnimatePresence>
        {status === 'gameover' && (
          <GameOverContainer
            as={motion.div}
            variants={gameOverVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <GameOverMessage>Tempo Scaduto!</GameOverMessage>
            <FinalScore>Punteggio finale: {score}</FinalScore>
            <RestartButton 
              onClick={onRestart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Gioca Ancora
            </RestartButton>
          </GameOverContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameStatus; 