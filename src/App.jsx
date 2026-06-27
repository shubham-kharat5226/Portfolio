import React, { useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme, useThemeVariables } from './styles/theme.jsx';
import { GlobalStyles } from "./styles/globalStyles"; // Named Import ✅
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Services from './sections/Services';
import Contact from './sections/Contact';
import ProjectModal from './components/ProjectModal';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import styled from 'styled-components';

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  position: relative;
  z-index: 1;
  will-change: transform;
  transform-style: preserve-3d;
  contain: layout style;
`;

const AppContent = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const themeVariables = useThemeVariables();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Simulating page load with performance optimization
  useEffect(() => {
    // Use requestIdleCallback when available, otherwise setTimeout
    const scheduleLoad = window.requestIdleCallback || setTimeout;
    
    const timer = scheduleLoad(() => {
      setIsLoading(false);
    }, { timeout: 2000 });
    
    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(timer);
      } else {
        clearTimeout(timer);
      }
    };
  }, []);
  
  return (
    <StyledThemeProvider theme={themeVariables}>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Cursor />
            <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
            <MainContent>
              <Home />
              <About />
              <Projects setSelectedProject={setSelectedProject} />
              <Services />
              <Contact />
            </MainContent>
            <AnimatePresence>
              {selectedProject && (
                <ProjectModal 
                  project={selectedProject} 
                  closeModal={() => setSelectedProject(null)} 
                />
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </StyledThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContainer>
        <AppContent />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;