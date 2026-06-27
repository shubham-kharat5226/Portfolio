import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components
const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
  z-index: 9999;
`;

const LogoContainer = styled(motion.div)`
  margin-bottom: 3rem;
`;

const Logo = styled.div`
  font-size: 3rem;
  font-weight: 700;
  position: relative;
  color: var(--text-primary);
  font-family: var(--font-heading);
  
  span {
    color: var(--primary-color);
  }
  
  /* Glowing dot at the end of the logo */
  &:after {
    content: '';
    position: absolute;
    right: -15px;
    bottom: 5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--primary-color);
    box-shadow: 0 0 10px var(--primary-color),
                0 0 20px var(--primary-color);
  }
`;

const ProgressBarContainer = styled.div`
  width: 240px;
  height: 4px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
`;

const LoadingText = styled(motion.p)`
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
`;

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const increment = Math.random() * 12;
        const newProgress = prevProgress + increment;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const progressBarVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${progress}%`,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3, 
        duration: 0.5 
      }
    }
  };

  return (
    <LoaderContainer
      initial={{ opacity: 1 }}
      exit={containerVariants.exit}
      animate={{ opacity: 1 }}
    >
      <LogoContainer
        initial="initial"
        animate="animate"
        variants={logoVariants}
      >
        <Logo>
          PORTFOLIO<span>.</span>
        </Logo>
      </LogoContainer>

      <ProgressBarContainer>
        <ProgressBar
          initial="initial"
          animate="animate"
          variants={progressBarVariants}
        />
      </ProgressBarContainer>

      <LoadingText
        initial="initial"
        animate="animate"
        variants={textVariants}
      >
        {progress < 100 ? (
          `LOADING: ${Math.round(progress)}%`
        ) : (
          'READY!'
        )}
      </LoadingText>
    </LoaderContainer>
  );
};

export default Loader;