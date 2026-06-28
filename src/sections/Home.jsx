import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from '../utils/useInView';
import { textVariants, fadeInUp, staggerContainer } from '../utils/animation';
import styled from 'styled-components';

const HomeSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  will-change: transform; /* Optimize for animations */
  z-index: 1;
`;

const ContentWrapper = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 10;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 6rem;
  }
  
  span {
    color: var(--primary-color);
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 8px;
      background: var(--primary-color);
      bottom: -8px;
      left: 0;
      border-radius: 4px;
      opacity: 0.6;
    }
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
  opacity: 0.85;
  line-height: 1.6;
  
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: var(--primary-color);
  color: var(--text-on-primary);
  border: none;
  padding: 0.75rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--secondary-color);
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  
  &:hover:before {
    opacity: 1;
  }
  
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ParallaxCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  opacity: 0.1;
  z-index: 1;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ScrollText = styled(motion.p)`
  font-size: 0.9rem;
  opacity: 0.7;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ScrollIcon = styled(motion.div)`
  width: 30px;
  height: 50px;
  border: 2px solid var(--text-primary);
  border-radius: 15px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    width: 6px;
    height: 6px;
    background: var(--primary-color);
    border-radius: 50%;
    transform: translateX(-50%);
  }
`;

const FloatingShapes = styled(motion.div)`
  position: absolute;
  pointer-events: none;
`;

const Shape = styled(motion.div)`
  position: absolute;
  background: var(--primary-color);
  border-radius: ${props => props.round ? '50%' : '4px'};
  opacity: 0.05;
`;

const Home = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    }
  }, [isInView, controls]);
  
  // Animation variants for parallax effect
  const parallaxVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 0.1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
  };
  
  // References for parallax effect on mouse move
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);
  
  // Optimize parallax effect on mouse move with passive event listeners and debouncing
  useEffect(() => {
    // Debounce function to limit execution frequency
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };
    
    // Use requestAnimationFrame for smooth animation
    let rafId = null;
    const handleMouseMove = (e) => {
      if (rafId) return; // Skip if we're already processing a frame
      
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const x = clientX / window.innerWidth;
        const y = clientY / window.innerHeight;
        
        setMousePosition({ x, y });
        
        if (!circle1Ref.current || !circle2Ref.current || !circle3Ref.current) return;
        
        circle1Ref.current.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
        circle2Ref.current.style.transform = `translate(${-x * 60}px, ${-y * 60}px)`;
        circle3Ref.current.style.transform = `translate(${x * 50}px, ${-y * 50}px)`;
        
        rafId = null;
      });
    };
    
    // Use passive event listener for better performance
    window.addEventListener('mousemove', debounce(handleMouseMove, 16), { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);
  
  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  const letterVariants = {
    initial: { y: 40, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95],
      }
    })
  };
  
  const titleText = "Hello, I'm";
  const nameText = "Shubham kharat";
  const roleText = "Full Stack Developer";
  
  return (
    <HomeSection id="home" ref={ref}>
      {/* Parallax background circles */}
      <ParallaxCircle
        ref={circle1Ref}
        variants={parallaxVariants}
        initial="initial"
        animate="animate"
        style={{
          width: '400px',
          height: '400px',
          top: '10%',
          right: '5%',
        }}
      />
      <ParallaxCircle
        ref={circle2Ref}
        variants={parallaxVariants}
        initial="initial"
        animate="animate"
        style={{
          width: '300px',
          height: '300px',
          bottom: '20%',
          left: '10%',
        }}
      />
      <ParallaxCircle
        ref={circle3Ref}
        variants={parallaxVariants}
        initial="initial"
        animate="animate"
        style={{
          width: '200px',
          height: '200px',
          top: '30%',
          left: '30%',
        }}
      />
      
      {/* Floating shapes with random animations */}
      <FloatingShapes>
        {[...Array(10)].map((_, i) => (
          <Shape
            key={i}
            round={i % 2 === 0}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              width: 10 + Math.random() * 30,
              height: 10 + Math.random() * 30,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: [
                Math.random() * window.innerHeight, 
                Math.random() * window.innerHeight
              ],
              x: [
                Math.random() * window.innerWidth, 
                Math.random() * window.innerWidth
              ],
              rotate: Math.random() * 720 - 360,
              transition: { 
                repeat: Infinity, 
                repeatType: 'reverse', 
                duration: 15 + Math.random() * 20,
                ease: 'easeInOut'
              }
            }}
          />
        ))}
      </FloatingShapes>
      
      <ContentWrapper
        variants={staggerContainer}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
      >
        <HeroTitle variants={textVariants}>
          <motion.div style={{ overflow: 'hidden' }}>
            {titleText.split('').map((char, i) => (
              <motion.span 
                key={`t-${i}`}
                custom={i}
                variants={letterVariants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                style={{ display: 'inline-block', marginRight: char === ' ' ? '0.5em' : '0' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          <motion.div style={{ overflow: 'hidden' }}>
            {nameText.split('').map((char, i) => (
              <motion.span 
                key={`n-${i}`}
                custom={i + titleText.length}
                variants={letterVariants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                style={{ 
                  display: 'inline-block', 
                  marginRight: char === ' ' ? '0.5em' : '0',
                  color: 'var(--primary-color)'
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          <motion.div style={{ overflow: 'hidden' }}>
            {roleText.split('').map((char, i) => (
              <motion.span 
                key={`r-${i}`}
                custom={i + titleText.length + nameText.length}
                variants={letterVariants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                style={{ display: 'inline-block', marginRight: char === ' ' ? '0.5em' : '0' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </HeroTitle>
        <Subtitle variants={fadeInUp}>
          Crafting beautiful digital experiences with clean code and cutting-edge design.
          Specializing in responsive web applications and interactive interfaces.
        </Subtitle>
        <motion.div variants={fadeInUp}>
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
          >
            View My Work
          </CTAButton>
        </motion.div>
      </ContentWrapper>
      
      <ScrollIndicator 
        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
        animate={{ 
          y: [0, 10, 0], 
          transition: { 
            repeat: Infinity, 
            duration: 1.5 
          } 
        }}
      >
        <ScrollText>Scroll Down</ScrollText>
        <ScrollIcon
          animate={{ 
            y: [0, 8, 0], 
            transition: { 
              repeat: Infinity, 
              duration: 1.5 
            } 
          }}
        />
      </ScrollIndicator>
    </HomeSection>
  );
};

export default Home;