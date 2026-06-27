import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for theme management
const ThemeContext = createContext();

/**
 * ThemeProvider component that wraps the application and provides theme functionality
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactNode} - Provider component with children
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme state from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Check if a theme is stored in localStorage
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme) {
        return savedTheme;
      }
      
      // Check for system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    // Default to light theme
    return 'light';
  });

  // Apply theme to DOM when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Store the current theme in localStorage
      localStorage.setItem('portfolio-theme', theme);
      
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', theme);
      
      // Apply theme-specific body class
      if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
      }
    }
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        // Only update if the user hasn't explicitly set a theme
        if (!localStorage.getItem('portfolio-theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      };
      
      // Add listener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }
      
      // Clean up
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else {
          // Fallback for older browsers
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, []);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  /**
   * Set theme to a specific value
   * 
   * @param {string} newTheme - Theme to set ('light' or 'dark')
   */
  const setThemeExplicitly = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme);
    }
  };

  /**
   * Reset theme to system preference
   */
  const resetTheme = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('portfolio-theme');
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  };

  // Context value
  const value = {
    theme,
    toggleTheme,
    setTheme: setThemeExplicitly,
    resetTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to access theme context
 * 
 * @returns {Object} - Theme context value
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Hook to get CSS theme variables
 * 
 * @returns {Object} - Object containing theme variables
 */
export const useThemeVariables = () => {
  const { theme } = useTheme();
  
  // Define colors for each theme
  const colors = {
    light: {
      primary: '#4361ee',
      secondary: '#3a0ca3',
      accent: '#4cc9f0',
      background: '#ffffff',
      backgroundAlt: '#f8f9fa',
      backgroundDark: '#e9ecef',
      text: '#212529',
      textSecondary: '#495057',
      border: '#dee2e6',
      glass: 'rgba(255, 255, 255, 0.8)',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      shadowHover: '0 10px 15px rgba(0, 0, 0, 0.1)',
      mode: 'light'
    },
    dark: {
      primary: '#4cc9f0',
      secondary: '#4895ef',
      accent: '#f72585',
      background: '#121212',
      backgroundAlt: '#1e1e1e',
      backgroundDark: '#0d0d0d',
      text: '#f8f9fa',
      textSecondary: '#e9ecef',
      border: '#2a2a2a',
      glass: 'rgba(30, 30, 30, 0.8)',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      shadowHover: '0 10px 15px rgba(0, 0, 0, 0.4)',
      mode: 'dark'
    }
  };
  
  return colors[theme];
};

// Default export
const ThemeUtils = {
  ThemeProvider,
  useTheme,
  useThemeVariables
};

export default ThemeUtils;