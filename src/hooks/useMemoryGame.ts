import { useState, useEffect, useCallback, useRef } from 'react';

type GameStatus = 'initial' | 'idle' | 'display' | 'input' | 'success' | 'failure' | 'gameover';

interface UseMemoryGameProps {
  initialLevel?: number;
  timeLimit?: number; // in milliseconds
  debug?: boolean;
}

interface UseMemoryGameReturn {
  sequence: number[];
  userInput: string;
  currentLevel: number;
  score: number;
  gameStatus: GameStatus;
  timeRemaining: number;
  displayNumber: number | null;
  displayIndex: number;
  hintUsed: boolean;
  handleUserInput: (num: number) => void;
  clearUserInput: () => void;
  submitAnswer: () => void;
  startGame: () => void;
  restartGame: () => void;
  showHint: () => void;
}

const useMemoryGame = ({
  initialLevel = 1,
  timeLimit = 600000, // 10 minutes in milliseconds
  debug = false
}: UseMemoryGameProps = {}): UseMemoryGameReturn => {
  // Check for debug level in localStorage
  const getInitialLevel = useCallback(() => {
    try {
      const debugLevel = localStorage.getItem('debug_level');
      if (debugLevel && !isNaN(Number(debugLevel))) {
        console.log(`[DEBUG] Starting from debug level: ${debugLevel}`);
        return Number(debugLevel);
      }
    } catch (e) {
      console.error('Error reading from localStorage', e);
    }
    return initialLevel;
  }, [initialLevel]);

  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [currentLevel, setCurrentLevel] = useState<number>(getInitialLevel());
  const [score, setScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('initial');
  const [timeRemaining, setTimeRemaining] = useState<number>(timeLimit);
  const [displayNumber, setDisplayNumber] = useState<number | null>(null);
  const [hintUsed, setHintUsed] = useState<boolean>(false);

  const displayIndexRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Debug logging helper
  const debugLog = useCallback((message: string, data?: any) => {
    if (debug || currentLevel >= 4) {
      console.log(`[DEBUG] ${message}`, data || '');
    }
  }, [debug, currentLevel]);

  // Generate a new random sequence
  const generateSequence = useCallback(() => {
    debugLog(`Generating new sequence for level ${currentLevel}`);
    
    // Make sure we clean any pending timers to avoid overlapping sequences
    if (timerRef.current) {
      debugLog('Clearing existing timer before generating new sequence');
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    const newSequence: number[] = [];
    for (let i = 0; i < currentLevel; i++) {
      newSequence.push(Math.floor(Math.random() * 10));
    }
    
    debugLog('Generated sequence', newSequence);
    return newSequence;
  }, [currentLevel, debugLog]);

  // Calculate display duration based on level
  const getDisplayDuration = useCallback(() => {
    // Start with 2000ms and decrease as level increases
    // Min duration is 1000ms
    const duration = Math.max(2000 - (currentLevel - 1) * 50, 1000);
    debugLog(`Display duration for level ${currentLevel}: ${duration}ms`);
    return duration;
  }, [currentLevel, debugLog]);

  // Display sequence numbers one by one
  const displaySequence = useCallback((numbersToDisplay: number[]) => {
    debugLog(`displaySequence called, index: ${displayIndexRef.current}, sequence length: ${numbersToDisplay.length}`);
    
    // Safety check - prevent invalid display index or empty array
    if (!numbersToDisplay || !Array.isArray(numbersToDisplay) || displayIndexRef.current >= numbersToDisplay.length) {
      debugLog('Invalid sequence or index out of bounds, resetting to input mode');
      displayIndexRef.current = 0;
      setGameStatus('input');
      return;
    }
    
    // Clear any existing timers to prevent overlapping
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    const numberToDisplay = numbersToDisplay[displayIndexRef.current];
    debugLog(`Displaying number at index ${displayIndexRef.current}: ${numberToDisplay}`);
    setDisplayNumber(numberToDisplay);

    timerRef.current = setTimeout(() => {
      debugLog('Clearing display number');
      setDisplayNumber(null);

      timerRef.current = setTimeout(() => {
        const nextIndex = displayIndexRef.current + 1;
        debugLog(`Moving to next number, incrementing index from ${displayIndexRef.current} to ${nextIndex}`);
        
        // First update the ref, then check if we're done
        displayIndexRef.current = nextIndex;
        
        if (nextIndex >= numbersToDisplay.length) {
          debugLog('Sequence display complete, moving to input mode');
          displayIndexRef.current = 0;
          setGameStatus('input');
        } else {
          displaySequence(numbersToDisplay);
        }
      }, 700);
    }, getDisplayDuration());
  }, [getDisplayDuration, debugLog]);

  // Start displaying the sequence
  const startDisplaySequence = useCallback((numbersToDisplay: number[]) => {
    debugLog('Starting sequence display with sequence', numbersToDisplay);
    
    // Safety check - validate sequence
    if (!Array.isArray(numbersToDisplay) || numbersToDisplay.length === 0) {
      debugLog('Invalid sequence, generating new one');
      const newSeq = generateSequence();
      setSequence(newSeq);
      numbersToDisplay = newSeq;
    }
    
    setGameStatus('display');
    displayIndexRef.current = 0;
    displaySequence(numbersToDisplay);
  }, [displaySequence, generateSequence, debugLog]);

  // Start the game
  const startGame = useCallback(() => {
    debugLog('Starting game');
    
    // Clear any existing timers first
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
      gameTimerRef.current = null;
    }

    // Reset all game state
    displayIndexRef.current = 0;
    setUserInput('');
    setDisplayNumber(null);
    setScore(0);
    const startLevel = getInitialLevel();
    setCurrentLevel(startLevel);
    setTimeRemaining(timeLimit);
    
    // Reset hint usage only at game start
    setHintUsed(false);

    // Generate initial sequence with proper length
    const newSequence = Array(startLevel).fill(0).map(() => Math.floor(Math.random() * 10));
    debugLog('Initial sequence generated', newSequence);
    setSequence(newSequence);

    // Set up the game timer
    gameTimerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1000) {
          if (gameTimerRef.current) {
            clearInterval(gameTimerRef.current);
            gameTimerRef.current = null;
          }
          setGameStatus('gameover');
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    // First set status to display to make UI appear
    setGameStatus('display');
    
    // Start the display sequence process
    const startTimer = setTimeout(() => {
      debugLog('Showing GET READY message');
      setDisplayNumber(-1);

      const readyTimer = setTimeout(() => {
        debugLog('Clearing GET READY message');
        setDisplayNumber(null);

        const sequenceTimer = setTimeout(() => {
          debugLog('Starting sequence display after GET READY');
          // Ensure displayIndex is reset before starting
          displayIndexRef.current = 0;
          startDisplaySequence(newSequence);
        }, 500);
        
        timerRef.current = sequenceTimer;
      }, 2000);
      
      timerRef.current = readyTimer;
    }, 500);
    
    timerRef.current = startTimer;
  }, [timeLimit, startDisplaySequence, getInitialLevel, debugLog]);

  // Restart the game
  const restartGame = useCallback(() => {
    debugLog('Restarting game');
    
    // First stop everything and reset
    setGameStatus('initial');
    setUserInput('');
    setDisplayNumber(null);
    displayIndexRef.current = 0;
    setHintUsed(false);
    setScore(0);
    setCurrentLevel(getInitialLevel());
    
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
      gameTimerRef.current = null;
    }

    // Give the system a moment to fully reset before starting again
    setTimeout(() => {
      startGame();
    }, 100);
    
  }, [debugLog, getInitialLevel, startGame]);

  // Handle user input
  const handleUserInput = useCallback((num: number) => {
    if (gameStatus === 'input') {
      debugLog(`User input: ${num}`);
      setUserInput(prev => {
        if (prev.length < sequence.length) {
          const newInput = prev + num;
          debugLog(`Updated user input: ${newInput}`);
          return newInput;
        }
        return prev;
      });
    }
  }, [gameStatus, sequence.length, debugLog]);

  // Clear user input
  const clearUserInput = useCallback(() => {
    debugLog('Clearing user input');
    setUserInput('');
  }, [debugLog]);

  // Submit and check user answer
  const submitAnswer = useCallback(() => {
    // Convert sequence to string for comparison
    const sequenceStr = sequence.join('');
    debugLog(`Checking answer - User input: ${userInput}, Expected: ${sequenceStr}`);

    if (userInput === sequenceStr) {
      // Correct answer
      debugLog('Correct answer!');
      setGameStatus('success');
      setScore(prev => prev + currentLevel);

      // Move to next level
      setTimeout(() => {
        const nextLevel = currentLevel + 1;
        debugLog(`Moving to level ${nextLevel}`);
        setCurrentLevel(nextLevel);
        setUserInput('');
      }, 1000);
    } else {
      // Wrong answer
      debugLog('Wrong answer!');
      setGameStatus('failure');

      // We keep the current score instead of resetting to 0
      setTimeout(() => {
        // Persist the score instead of resetting
        setUserInput('');
      }, 1000);
    }
  }, [userInput, sequence, currentLevel, getInitialLevel, debugLog]);

  // Show the sequence again as a hint (can only be used once during the entire game)
  const showHint = useCallback(() => {
    if (gameStatus === 'input' && !hintUsed) {
      debugLog('Showing hint - replaying sequence');
      setHintUsed(true);
      
      // Clear user input when hint is used
      setUserInput('');
      
      // Prevent further input during hint playback
      setGameStatus('display');
      
      // Clear any existing timers
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      
      // Reset display index
      displayIndexRef.current = 0;
      
      // Show a "GET READY FOR HINT" message
      setDisplayNumber(-1);
      
      const hintTimer = setTimeout(() => {
        setDisplayNumber(null);
        
        const startSequenceTimer = setTimeout(() => {
          // Start displaying the sequence
          startDisplaySequence(sequence);
        }, 500);
        
        timerRef.current = startSequenceTimer;
      }, 1500);
      
      timerRef.current = hintTimer;
    } else {
      debugLog('Hint cannot be used - already used or invalid game state');
    }
  }, [gameStatus, hintUsed, sequence, startDisplaySequence, debugLog]);

  // Effect to handle level change
  useEffect(() => {
    if (currentLevel > 1 && gameStatus === 'success') {
      debugLog(`Level changed to ${currentLevel}, generating new sequence`);
      
      // Clear any existing timers
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      
      // Reset display index before generating a new sequence
      displayIndexRef.current = 0;
      
      // Generate new sequence for next level
      const newSequence = generateSequence();
      debugLog(`New sequence for level ${currentLevel}:`, newSequence);
      setSequence(newSequence);

      // Start displaying the new sequence after a brief delay
      const transitionTimer = setTimeout(() => {
        debugLog('Starting to display sequence for new level');
        
        // Show GET READY message again
        setDisplayNumber(-1);
        
        const readyTimer = setTimeout(() => {
          setDisplayNumber(null);
          
          const startTimer = setTimeout(() => {
            // Ensure displayIndex is still 0 before starting
            displayIndexRef.current = 0;
            startDisplaySequence(newSequence);
          }, 500);
          
          // Store the timer reference
          timerRef.current = startTimer;
        }, 1500);
        
        timerRef.current = readyTimer;
      }, 1000);
      
      timerRef.current = transitionTimer;
    }
  }, [currentLevel, gameStatus, generateSequence, startDisplaySequence, debugLog]);

  // Cleanup effect
  useEffect(() => {
    // Flag to track if the component is mounted
    let isMounted = true;
    
    return () => {
      isMounted = false;
      debugLog('Cleaning up timers');
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
        gameTimerRef.current = null;
      }
    };
  }, [debugLog]);

  return {
    sequence,
    userInput,
    currentLevel,
    score,
    gameStatus,
    timeRemaining,
    displayNumber,
    displayIndex: displayIndexRef.current,  // Expose for debugging
    hintUsed,
    handleUserInput,
    clearUserInput,
    submitAnswer,
    startGame,
    restartGame,
    showHint,
  };
};

export default useMemoryGame;