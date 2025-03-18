import styled from 'styled-components';
import { motion } from 'framer-motion';

// Theme type definition
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    light: string;
    neutral: string;
    dark: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    cardBackground: string;
    border: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
}

// Extend the DefaultTheme
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  overflow-x: hidden;
  padding: 0;
  margin: 0;
`;

export const GameHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 80px;
  width: 100%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: white;
  
  h1 {
    font-size: 2rem;
    margin: 0;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  @media (orientation: landscape) {
    height: 60px;
    
    h1 {
      font-size: 1.7rem;
    }
  }
`;

export const GameTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

export const TimerDisplay = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.dark};
  background-color: ${({ theme }) => theme.colors.light};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 80px);
  margin: 0 auto;
  position: relative;
  background: white;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  @media (orientation: landscape) {
    height: calc(100vh - 60px);
    padding: 0.5rem;
  }
`;

export const NumberDisplayContainer = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0.5rem 0 1rem 0;
  
  @media (orientation: landscape) {
    height: 100px;
    margin: 0.25rem 0 0.5rem 0;
  }
`;

export const NumberDisplay = styled(motion.div)`
  font-size: 4rem;
  font-weight: bold;
  color: white;
  height: 120px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  
  @media (orientation: landscape) {
    height: 90px;
    width: 90px;
    font-size: 3rem;
  }
`;

export const GameControlsContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 0.5rem;
  
  @media (orientation: landscape) {
    gap: 0.5rem;
    margin-top: 0.25rem;
  }
`;

export const NumpadContainer = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  margin: 0.5rem auto;
  border-radius: 12px;
  
  @media (orientation: landscape) {
    gap: 0.6rem;
    padding: 0.6rem;
    margin: 0.5rem auto;
    max-width: 280px;
    align-self: center;
  }
`;

export const NumpadButton = styled(motion.button)`
  font-size: 2.8rem;
  font-weight: bold;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  padding: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (orientation: landscape) {
    font-size: 2.5rem;
    width: 50px;
    height: 50px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  max-width: 300px;
  justify-content: center;
  padding: 0.5rem;
  margin: 0.5rem auto;
  
  @media (orientation: landscape) {
    gap: 1rem;
    margin: 0.5rem auto;
    max-width: 280px;
    align-self: center;
  }
`;

export const ScoreContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.light};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  
  @media (orientation: landscape) {
    position: absolute;
    top: 1rem;
    right: 1rem;
    margin-bottom: 0;
  }
`;

export const Instructions = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0.5rem 10rem;
  min-height: 40px;
  font-weight: 600;
  padding: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  
  @media (orientation: landscape) {
    font-size: 1.4rem;
    margin: 0.25rem 0;
    min-height: 30px;
    padding: 0.25rem;
  }
`;

export const SequenceDisplay = styled.div`
  width: 100%;
  max-width: 300px;
  text-align: center;
  min-height: 60px;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin: 0.5rem auto 1rem auto;
  box-shadow: ${({ theme }) => theme.shadows.small};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (orientation: landscape) {
    min-height: 50px;
    font-size: 2rem;
    padding: 0.25rem 1rem;
    margin: 0.5rem auto 0.75rem auto;
    max-width: 280px;
    align-self: center;
  }
`;

// Button styles
const BaseButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.25rem;
  font-weight: bold;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.small};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  @media (orientation: landscape) {
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
  }
`;

export const ClearButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.dark};
  color: white;
  font-size: 1.2rem;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.small};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.neutral};
    color: ${({ theme }) => theme.colors.dark};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

export const SubmitButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.small};
  
  &:hover:not(:disabled) {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

export const StartButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
  
  svg {
    font-size: 1.5rem;
  }
`;

export const RestartButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.small};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

export const HintButton = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.small};
  
  &:hover:not(:disabled) {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

// Welcome screen styles
export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.5rem;
  padding: 2rem;
  width: 100%;
  height: 100%;
  
  @media (orientation: landscape) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (orientation: landscape) {
    font-size: 2rem;
    width: 100%;
  }
`;

export const WelcomeText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 600px;
  line-height: 1.6;
  
  @media (orientation: landscape) {
    font-size: 1.1rem;
    line-height: 1.4;
    margin: 0.5rem 0;
    width: 100%;
  }
`;

export const ScoreLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  
  @media (orientation: landscape) {
    font-size: 0.9rem;
  }
`;

export const ScoreValue = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  
  @media (orientation: landscape) {
    font-size: 1.8rem;
  }
`;

export const GameOverContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const GameOverMessage = styled.h2`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (orientation: landscape) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

export const FinalScore = styled.p`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (orientation: landscape) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const MessageContainer = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.success};
  min-height: 1.5rem;
  margin: 1rem 0;
  text-align: center;
  
  @media (orientation: landscape) {
    margin: 0.5rem 0;
    min-height: 1.2rem;
    order: 6;
  }
`;

export const ErrorMessage = styled(MessageContainer)`
  color: ${({ theme }) => theme.colors.error};
`;

export const SuccessMessage = styled(MessageContainer)`
  color: ${({ theme }) => theme.colors.success};
`;

export const PreparatiDisplay = styled(motion.div)`
  font-size: 2rem;
  font-weight: bold;
  color: white;
  height: 120px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (orientation: landscape) {
    height: 90px;
    font-size: 1.5rem;
    width: 180px;
  }
`;