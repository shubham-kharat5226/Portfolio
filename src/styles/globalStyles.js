import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Optimize font loading */
  @font-face {
    font-family: 'System Font';
    src: local('-apple-system'), local('BlinkMacSystemFont'), local('Segoe UI'), 
         local('Roboto'), local('Oxygen'), local('Ubuntu'), local('Cantarell'), 
         local('Open Sans'), local('Helvetica Neue'), local('sans-serif');
    font-display: swap;
  }

  /* CSS Variables for theming */
  :root {
    /* Light Theme (default) */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-tertiary: #f1f3f5;
    --text-primary: #212529;
    --text-secondary: #495057;
    --text-tertiary: #868e96;
    --primary-color: #4361ee;
    --secondary-color: #3a0ca3;
    --accent-color: #4cc9f0;
    --danger-color: #e63946;
    --success-color: #2a9d8f;
    --border-color: #dee2e6;
    --card-bg: #ffffff;
    --card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    --text-on-primary: #ffffff;
    --nav-bg: rgba(255, 255, 255, 0.8);
    --input-bg: #ffffff;
    --input-border: #ced4da;
    --modal-overlay: rgba(0, 0, 0, 0.4);
    --scrollbar-thumb: #c5c5c5;
    --scrollbar-track: #f1f1f1;
    
    /* UI Effects */
    --glass-bg: rgba(255, 255, 255, 0.5);
    --glass-border: rgba(255, 255, 255, 0.18);
    --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
    --card-hover-transform: translateY(-5px);

    /* Typography with fallbacks */
    --font-sans: 'Inter', 'System Font', sans-serif;
    --font-mono: 'JetBrains Mono', 'System Font', monospace;
    --font-heading: 'Poppins', 'System Font', sans-serif;
    
    /* Animation */
    --transition-slow: 0.5s ease;
    --transition-normal: 0.3s ease;
    --transition-fast: 0.15s ease;
    
    /* Layout */
    --header-height: 80px;
    --content-width: 1200px;
    --section-padding: 100px;
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 16px;
  }

  /* Dark Theme */
  [data-theme="dark"] {
    --bg-primary: #121212;
    --bg-secondary: #1e1e1e;
    --bg-tertiary: #292929;
    --text-primary: #f8f9fa;
    --text-secondary: #e9ecef;
    --text-tertiary: #adb5bd;
    --primary-color: #4cc9f0;
    --secondary-color: #4895ef;
    --accent-color: #f72585;
    --border-color: #343a40;
    --card-bg: #1e1e1e;
    --card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    --nav-bg: rgba(18, 18, 18, 0.8);
    --input-bg: #1e1e1e;
    --input-border: #343a40;
    --scrollbar-thumb: #666;
    --scrollbar-track: #333;
    
    /* UI Effects */
    --glass-bg: rgba(18, 18, 18, 0.7);
    --glass-border: rgba(255, 255, 255, 0.05);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  }

  /* Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    scroll-padding-top: var(--header-height);
  }

  body {
    font-family: var(--font-sans);
    background-color: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    transition: background-color var(--transition-slow), color var(--transition-slow);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    scroll-behavior: smooth;
    scroll-padding-top: var(--header-height);
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    transition: color var(--transition-normal);
    text-rendering: optimizeLegibility; /* Optimize text rendering */
  }

  h1 {
    font-size: 3.5rem;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 2.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 2rem;
    
    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  p {
    margin-bottom: 1rem;
    color: var(--text-secondary);
    transition: color var(--transition-normal);
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--secondary-color);
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    
    &:focus {
      outline: none;
    }
  }

  /* Container */
  .container {
    width: 100%;
    max-width: var(--content-width);
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* Section */
  section {
    padding: var(--section-padding) 0;
    position: relative;
    z-index: 1;
    
    @media (max-width: 768px) {
      padding: calc(var(--section-padding) / 2) 0;
    }
  }

  /* Glassmorphism */
  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    border-radius: var(--border-radius-md);
  }

  /* Neumorphism */
  .neumorph {
    background: var(--bg-secondary);
    border-radius: var(--border-radius-md);
    box-shadow: 
      5px 5px 10px rgba(0, 0, 0, 0.1),
      -5px -5px 10px rgba(255, 255, 255, 0.05);
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
  }

  /* Selection */
  ::selection {
    background-color: var(--primary-color);
    color: #ffffff;
  }

  /* Utility Classes */
  .text-center {
    text-align: center;
  }

  .text-gradient {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Animation helpers */
  .blur-in {
    animation: blurIn 0.5s ease-out forwards;
  }

  @keyframes blurIn {
    0% {
      opacity: 0;
      filter: blur(20px);
    }
    100% {
      opacity: 1;
      filter: blur(0);
    }
  }

  /* Optimize layout shifts during font loading */
  @media screen and (min-width: 768px) {
    /* Approximate font metrics to reduce layout shift */
    :root {
      --font-sans-fallback-ratio: 0.98; /* Approximation of system vs. loaded font */
    }
    
    body, button, input, textarea, select {
      font-family: var(--font-sans);
      font-display: swap; /* Ensure text is visible while fonts load */
    }
  }
`;