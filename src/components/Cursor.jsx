import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
`;

const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary};
  z-index: 999;
  pointer-events: none;
  mix-blend-mode: difference;
  
  /* Add subtle glow effect in dark mode */
  box-shadow: ${props => props.theme === 'dark' 
    ? `0 0 10px ${props.theme.primary}80, 0 0 20px ${props.theme.primary}40` 
    : 'none'};
`;

const CursorRing = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 2px solid ${props => props.theme.primary};
  border-radius: 50%;
  z-index: 998;
  pointer-events: none;
  opacity: 0.5;
  mix-blend-mode: difference;
`;

const CursorHighlight = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  background: ${props => `${props.theme.primary}20`};
  border-radius: 50%;
  z-index: 997;
  pointer-events: none;
  opacity: 0;
  mix-blend-mode: exclusion;
`;

const TrailDot = styled(motion.div)`
  position: fixed;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${props => props.theme.primary}80;
  z-index: 996;
  pointer-events: none;
  opacity: 0.6;
  mix-blend-mode: screen;
`;

// This custom hook handles mouse tracking with spring physics
const useMousePosition = (springConfig = { damping: 25, stiffness: 300 }) => {
  // Raw mouse positions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth following
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);
  
  return { mouseX, mouseY, springX, springY };
};

const Cursor = () => {
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [linkHovering, setLinkHovering] = useState(false);
  const [buttonHovering, setButtonHovering] = useState(false);
  const trailsRef = useRef([]);
  
  // Use our custom hook for smooth mouse tracking
  const { mouseX, mouseY, springX, springY } = useMousePosition();
  
  // Create 8 trail dots with increasing delay
  const trails = [...Array(8)].map((_, i) => {
    const delay = i * 0.05;
    return {
      x: useTransform(springX, value => value),
      y: useTransform(springY, value => value),
      delay,
      opacity: useTransform(
        springX, 
        // Fade out based on mouse velocity (approximate)
        value => 0.6 - (i * 0.07)
      )
    };
  });
  
  useEffect(() => {
    // Hide cursor on mobile devices
    if (window.matchMedia('(max-width: 768px)').matches) {
      return;
    }
    
    // Show cursor after a short delay to avoid initial position bugs
    const timeout = setTimeout(() => setVisible(true), 500);
    
    // Add listeners for cursor states
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleLinkHover = () => {
      setLinkHovering(true);
      setHovering(true);
    };
    
    const handleLinkLeave = () => {
      setLinkHovering(false);
      setHovering(false);
    };
    
    const handleButtonHover = () => {
      setButtonHovering(true);
      setHovering(true);
    };
    
    const handleButtonLeave = () => {
      setButtonHovering(false);
      setHovering(false);
    };
    
    // Add listeners to interactive elements
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Get all links
    const links = document.querySelectorAll('a, .link, [data-cursor="link"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });
    
    // Get all buttons
    const buttons = document.querySelectorAll('button, .button, [data-cursor="button"]');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleButtonHover);
      button.addEventListener('mouseleave', handleButtonLeave);
    });
    
    // Get all images and other elements that should have hover effect
    const hoverables = document.querySelectorAll('img, .hoverable, [data-cursor="hover"]');
    hoverables.forEach(element => {
      element.addEventListener('mouseenter', () => setHovering(true));
      element.addEventListener('mouseleave', () => setHovering(false));
    });
    
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
      
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleButtonHover);
        button.removeEventListener('mouseleave', handleButtonLeave);
      });
      
      hoverables.forEach(element => {
        element.removeEventListener('mouseenter', () => setHovering(true));
        element.removeEventListener('mouseleave', () => setHovering(false));
      });
    };
  }, []);
  
  // Don't render cursor on mobile
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }
  
  return (
    <CursorWrapper style={{ opacity: visible ? 1 : 0 }}>
      {/* Cursor trails for elegant motion */}
      {trails.map((trail, index) => (
        <TrailDot
          key={index}
          ref={el => trailsRef.current[index] = el}
          style={{
            left: -2.5, // Half of dot size
            top: -2.5,
            x: trail.x,
            y: trail.y,
            opacity: trail.opacity,
            transition: `opacity 0.3s ease, transform ${0.2 + trail.delay}s cubic-bezier(0.25, 0.1, 0.25, 1)`,
            scale: 1 - (index * 0.1)
          }}
        />
      ))}
      
      {/* Main cursor elements */}
      <CursorDot
        style={{
          left: -4, // Half of dot size
          top: -4,
          x: mouseX,
          y: mouseY,
          scale: clicked ? 0.5 : hovering ? 0 : 1,
          opacity: clicked ? 0.8 : 1
        }}
      />
      
      <CursorRing
        style={{
          left: -20, // Half of ring size
          top: -20,
          x: springX,
          y: springY,
          scale: clicked ? 0.8 : linkHovering ? 1.5 : hovering ? 1.3 : 1,
          opacity: hovering ? 0.6 : 0.4,
          borderWidth: clicked ? 3 : 2
        }}
      />
      
      <CursorHighlight
        style={{
          left: -40, // Half of highlight size
          top: -40,
          x: springX,
          y: springY,
          scale: buttonHovering ? 1 : 0,
          opacity: buttonHovering ? 0.15 : 0
        }}
      />
    </CursorWrapper>
  );
};

export default Cursor;