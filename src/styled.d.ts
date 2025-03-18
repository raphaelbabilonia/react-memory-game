import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      error: string;
      warning: string;
      info: string;
      light: string;
      dark: string;
      text: string;
      background: string;
      cardBackground: string;
      border: string;
    };
    fonts: {
      main: string;
    };
    breakpoints: {
      tablet: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      round: string;
    };
  }
} 