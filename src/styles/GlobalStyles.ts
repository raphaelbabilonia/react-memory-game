import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    overflow: hidden;
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
  }
  
  button {
    cursor: pointer;
    user-select: none;
    -webkit-touch-callout: none;
  }
  
  /* Improved media queries for different device sizes */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
  
  @media (max-width: 480px) {
    html {
      font-size: 12px;
    }
  }
  
  /* Landscape orientation adjustments */
  @media (orientation: landscape) and (max-height: 500px) {
    html {
      font-size: 12px;
    }
  }
`;

export default GlobalStyles; 