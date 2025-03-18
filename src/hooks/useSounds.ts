import { useCallback, useEffect, useRef } from 'react';

// Simple sound player interface
interface UseSoundsReturn {
  playSuccess: () => void;
  playError: () => void;
  playButton: () => void;
  playSequence: () => void;
}

const useSounds = (): UseSoundsReturn => {
  // Create refs to store the audio context and sound functions
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Initialize audio context on first render
  useEffect(() => {
    console.log('[SOUND] Initializing audio system');
    try {
      // Create a single AudioContext for all sounds
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      console.log('[SOUND] Audio context created successfully');
    } catch (error) {
      console.error('[SOUND] Error creating audio context:', error);
    }
    
    // Clean up audio context when component unmounts
    return () => {
      console.log('[SOUND] Cleaning up audio system');
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, []);
  
  // Generic function to create and play a sound
  const playSound = useCallback((type: 'success' | 'error' | 'button' | 'sequence') => {
    console.log(`[SOUND] Attempting to play ${type} sound`);
    
    try {
      if (!audioContextRef.current) {
        console.warn('[SOUND] Audio context not initialized');
        // Try to create audio context on demand (needed for some browsers)
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Resume audio context if it was suspended (browser autoplay policy)
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      
      // Create oscillator and gain nodes
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      // Set different sound parameters based on the sound type
      switch (type) {
        case 'success':
          // Success sound - ascending tone
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(330, audioContextRef.current.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            880, audioContextRef.current.currentTime + 0.2
          );
          gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.001, audioContextRef.current.currentTime + 0.3
          );
          oscillator.start();
          oscillator.stop(audioContextRef.current.currentTime + 0.3);
          break;
          
        case 'error':
          // Error sound - descending tone
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(
            220, audioContextRef.current.currentTime + 0.2
          );
          gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.001, audioContextRef.current.currentTime + 0.3
          );
          oscillator.start();
          oscillator.stop(audioContextRef.current.currentTime + 0.3);
          break;
          
        case 'button':
          // Button sound - short click
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(660, audioContextRef.current.currentTime);
          gainNode.gain.setValueAtTime(0.05, audioContextRef.current.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.001, audioContextRef.current.currentTime + 0.1
          );
          oscillator.start();
          oscillator.stop(audioContextRef.current.currentTime + 0.1);
          break;
          
        case 'sequence':
          // Sequence sound - medium tone
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(550, audioContextRef.current.currentTime);
          gainNode.gain.setValueAtTime(0.08, audioContextRef.current.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(
            0.001, audioContextRef.current.currentTime + 0.15
          );
          oscillator.start();
          oscillator.stop(audioContextRef.current.currentTime + 0.15);
          break;
      }
      
      console.log(`[SOUND] ${type} sound playing`);
    } catch (error) {
      console.error(`[SOUND] Error playing ${type} sound:`, error);
    }
  }, []);
  
  // Individual sound functions
  const playSuccess = useCallback(() => playSound('success'), [playSound]);
  const playError = useCallback(() => playSound('error'), [playSound]);
  const playButton = useCallback(() => playSound('button'), [playSound]);
  const playSequence = useCallback(() => playSound('sequence'), [playSound]);
  
  return {
    playSuccess,
    playError,
    playButton,
    playSequence
  };
};

export default useSounds; 