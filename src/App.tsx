import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/Theme';
import styled from 'styled-components';
import {
  AppContainer,
  GameContainer,
  GameHeader,
  NumpadContainer,
  ButtonGroup,
  ClearButton,
  SubmitButton,
  StartButton,
  RestartButton,
  WelcomeContainer,
  WelcomeTitle,
  WelcomeText,
  Instructions,
  SequenceDisplay,
  NumberDisplayContainer,
  ScoreContainer,
  ScoreLabel,
  ScoreValue,
  HintButton
} from './styles/StyledComponents';
import useMemoryGame from './hooks/useMemoryGame';
import useSounds from './hooks/useSounds';
import NumberDisplay from './components/NumberDisplay';
import Numpad from './components/Numpad';
// Import React Icons
import { FaVolumeUp, FaVolumeMute, FaBug, FaBrain, FaRedo, FaTrash, FaPaperPlane, FaLightbulb, FaPlay } from 'react-icons/fa';

// Debug panel styled component
const DebugPanel = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: lime;
  font-family: monospace;
  padding: 10px;
  font-size: 12px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  
  pre {
    margin: 0;
    padding: 5px;
  }
  
  button {
    background: #333;
    color: white;
    border: 1px solid lime;
    padding: 2px 5px;
    margin: 2px;
    font-size: 10px;
    cursor: pointer;
  }
  
  .debug-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
  }
  
  .debug-actions {
    display: flex;
    gap: 5px;
    margin-top: 10px;
  }
`;

// Responsive layout components
const GameLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  
  @media (orientation: landscape) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0;
  }
`;

const GameInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  @media (orientation: landscape) {
    /* flex: 0 0 40%; */
    margin-bottom: 0;
    padding-right: 20px;
  }
`;

const GameInputSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
/*   justify-content: center; */
  width: 100%;
  
  @media (orientation: landscape) {
  /*   flex: 0 0 60%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
`;

const SoundButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 2rem;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }

  svg {
    vertical-align: middle;
  }
`;

// New component for the failure screen
const FailureScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  
  @media (orientation: landscape) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`;

const FailureMessage = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 2rem;
  text-transform: uppercase;
  
  @media (orientation: landscape) {
    margin-bottom: 1.5rem;
  }
`;

const App: React.FC = () => {
  const [showDebug, setShowDebug] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const {
    sequence,
    userInput,
    currentLevel,
    score,
    gameStatus,
    displayNumber,
    displayIndex,
    hintUsed,
    handleUserInput,
    clearUserInput,
    submitAnswer,
    startGame,
    restartGame,
    showHint,
  } = useMemoryGame({ debug: true });
  
  // Use the sound hooks
  const { playSuccess, playError, playButton, playSequence } = useSounds();

  // Debug keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle debug panel with "D" key
      if (e.key === 'd' && e.ctrlKey) {
        setShowDebug(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Test sounds function for debug panel
  const testSounds = () => {
    console.log('[DEBUG] Testing sounds');
    if (soundEnabled) {
      setTimeout(() => playButton(), 0);
      setTimeout(() => playSequence(), 500);
      setTimeout(() => playSuccess(), 1000);
      setTimeout(() => playError(), 1500);
    } else {
      console.log('[DEBUG] Sound is disabled. Enable sound to test.');
    }
  };
  
  // Force start level 4 for debugging
  const startLevel4 = () => {
    localStorage.setItem('debug_level', '4');
    restartGame();
    console.log('[DEBUG] Starting at level 4 for debugging');
  };
  
  // Clear any local storage debug settings
  const clearDebugSettings = () => {
    localStorage.removeItem('debug_level');
    console.log('[DEBUG] Cleared debug settings');
  };
  
  // Play sounds based on game state changes
  useEffect(() => {
    if (!soundEnabled) return;
    
    if (gameStatus === 'success') {
      // Using setTimeout to ensure the sound plays after state updates are complete
      setTimeout(() => {
        console.log('[SOUND-APP] Playing success sound for game state change');
        playSuccess();
      }, 100);
    } else if (gameStatus === 'failure') {
      setTimeout(() => {
        console.log('[SOUND-APP] Playing error sound for game state change');
        playError();
      }, 100);
    }
  }, [gameStatus, soundEnabled, playSuccess, playError]);
  
  // Handle display number change to play sequence sound
  useEffect(() => {
    if (!soundEnabled) return;
    
    if (gameStatus === 'display' && displayNumber !== null && displayNumber !== -1) {
      // Play sequence sound when a new number is displayed
      console.log('[SOUND-APP] Playing sequence sound for display number:', displayNumber);
      playSequence();
    }
  }, [displayNumber, gameStatus, soundEnabled, playSequence]);
  
  // Handle numpad click with sound
  const handleNumpadClick = (num: number) => {
    if (soundEnabled) {
      // Play sound first for immediate feedback, then handle input
      console.log('[SOUND-APP] Playing button sound for numpad click:', num);
      playButton();
    }
    handleUserInput(num);
  };
  
  // Handle button clicks with sound
  const handleButtonWithSound = (action: () => void) => {
    return () => {
      if (soundEnabled) {
        // Play sound first for immediate feedback, then execute action
        console.log('[SOUND-APP] Playing button sound for button click');
        playButton();
        // Short timeout to ensure the sound starts playing before the action
        setTimeout(action, 10);
      } else {
        // If sound is disabled, just execute the action directly
        action();
      }
    };
  };

  // Toggle sound function
  const toggleSound = () => {
    console.log('[SOUND-APP] Toggling sound:', !soundEnabled);
    setSoundEnabled(prev => !prev);
    
    // Play a sound if we're enabling sound
    if (!soundEnabled) {
      setTimeout(() => {
        playButton();
      }, 100);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <GameHeader>
          <h1>Gioco di Memoria</h1>
          <div style={{ position: 'absolute', right: '10px', display: 'flex', gap: '10px' }}>
            <SoundButton 
              onClick={toggleSound} 
              aria-label={soundEnabled ? 'Disattiva suono' : 'Attiva suono'}
            >
              {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
            </SoundButton>
            <button 
              onClick={() => setShowDebug(prev => !prev)} 
              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
              aria-label={showDebug ? 'Nascondi Debug' : 'Mostra Debug'}
            >
              <FaBug />
            </button>
          </div>
        </GameHeader>
        
        <GameContainer>
          {gameStatus === 'initial' ? (
            <WelcomeContainer>
              <WelcomeTitle>Sei pronto per il tuo test?</WelcomeTitle>
              <WelcomeText>
                Ti verranno mostrati dei numeri in sequenza. Memorizzali e poi inseriscili nell'ordine corretto.
              </WelcomeText>
              <StartButton 
                onClick={handleButtonWithSound(startGame)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay style={{ marginRight: '8px' }} /> Inizia Gioco
              </StartButton>
            </WelcomeContainer>
          ) : (
            <GameLayout>
              <GameInfoSection style={{ display: ['input', 'failure', 'gameover'].includes(gameStatus) ? 'none' : 'flex' }}>
                <ScoreContainer>
                  <ScoreLabel>Punteggio</ScoreLabel>
                  <ScoreValue>{score}</ScoreValue>
                </ScoreContainer>
                
                <Instructions>
                  {gameStatus === 'display' 
                    ? `Livello ${currentLevel}` 
                    : gameStatus === 'success'
                      ? 'Corretto!'
                      : gameStatus === 'failure'
                        ? 'Sbagliato! Riprova'
                        : ''}
                </Instructions>
                
                <NumberDisplayContainer>
                  <NumberDisplay
                    number={displayNumber}
                    onAnimationComplete={() => {}}
                  />
                </NumberDisplayContainer>
              </GameInfoSection>
              
              {gameStatus === 'input' && (
                <GameInputSection>
                  <SequenceDisplay>
                    {userInput.length > 0 
                      ? userInput 
                      : <span style={{ color: '#aaa', letterSpacing: '0.1rem', fontSize: '1.6rem' }}>
                          Inserisci la sequenza
                        </span>
                    }
                  </SequenceDisplay>
                  
                  <NumpadContainer>
                    <Numpad onNumberClick={handleNumpadClick} disabled={gameStatus !== 'input'} />
                  </NumpadContainer>
                  
                  <ButtonGroup>
                    <ClearButton 
                      onClick={handleButtonWithSound(clearUserInput)}
                      disabled={gameStatus !== 'input' || userInput.length === 0}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTrash style={{ marginRight: '8px' }} /> Cancella
                    </ClearButton>
                    
                    <SubmitButton 
                      onClick={handleButtonWithSound(submitAnswer)}
                      disabled={gameStatus !== 'input' || userInput.length === 0}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaPaperPlane style={{ marginRight: '8px' }} /> Invia
                    </SubmitButton>
                  </ButtonGroup>
                  
                  <HintButton 
                    onClick={handleButtonWithSound(showHint)}
                    disabled={hintUsed || gameStatus !== 'input'}
                    whileHover={!hintUsed ? { scale: 1.05 } : {}}
                    whileTap={!hintUsed ? { scale: 0.95 } : {}}
                    style={{ 
                      opacity: hintUsed ? 0.5 : 1,
                      cursor: hintUsed ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <FaLightbulb style={{ marginRight: '8px' }} /> {hintUsed ? 'Aiuto Usato' : 'Vedi di nuovo la Sequenza'}
                  </HintButton>
                </GameInputSection>
              )}
              
              {(gameStatus === 'gameover' || gameStatus === 'failure') && (
                <FailureScreenContainer>
                  {gameStatus === 'failure' && (
                    <FailureMessage>
                      Sbagliato!<br />Riprova
                    </FailureMessage>
                  )}
                  <RestartButton 
                    onClick={handleButtonWithSound(restartGame)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaRedo style={{ marginRight: '8px' }} /> Ricomincia
                  </RestartButton>
                </FailureScreenContainer>
              )}
            </GameLayout>
          )}
          
          {showDebug && (
            <DebugPanel>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h4 style={{ margin: 0 }}>Informazioni Debug</h4>
                <button onClick={() => setShowDebug(false)}>Chiudi</button>
              </div>
              
              <div className="debug-grid">
                <pre>Stato Gioco: {gameStatus}</pre>
                <pre>Livello Attuale: {currentLevel}</pre>
                <pre>Indice Display: {displayIndex}</pre>
                <pre>Punteggio: {score}</pre>
                <pre>Display Attuale: {displayNumber === -1 ? 'PREPARATI!' : displayNumber}</pre>
                <pre>Lunghezza Sequenza: {sequence.length}</pre>
                <pre>Suono: {soundEnabled ? 'ATTIVO' : 'DISATTIVO'}</pre>
                <pre>Aiuto Usato: {hintUsed ? 'SÌ' : 'NO'}</pre>
              </div>
              
              <pre>Sequenza: {sequence.join(', ')}</pre>
              <pre>Input Utente: {userInput}</pre>
              
              <div className="debug-actions">
                <button onClick={() => console.log({ sequence, userInput, currentLevel, gameStatus, displayNumber, displayIndex })}>
                  Log Stato
                </button>
                <button onClick={startLevel4}>
                  Debug Livello 4
                </button>
                <button onClick={clearDebugSettings}>
                  Pulisci Debug
                </button>
                <button onClick={handleButtonWithSound(restartGame)}>
                  Forza Riavvio
                </button>
                <button onClick={toggleSound}>
                  {soundEnabled ? <FaVolumeUp style={{ marginRight: '5px' }} /> : <FaVolumeMute style={{ marginRight: '5px' }} />}
                  {soundEnabled ? 'Disattiva Suono' : 'Attiva Suono'}
                </button>
                <button onClick={testSounds} disabled={!soundEnabled}>
                  Testa Suoni
                </button>
              </div>
            </DebugPanel>
          )}
        </GameContainer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
