// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';

const NavbarContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 20px;
  
  /* Glassmorphism effect - only applied when scrolled */
  background: ${props => props.$scrolled 
    ? props.theme.glass
    : 'transparent'
  };
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.$scrolled 
    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
    : 'none'
  };
  border-bottom: ${props => props.$scrolled 
    ? `1px solid rgba(255, 255, 255, 0.1)` 
    : 'none'
  };
  
  /* Smooth transition */
  transition: all 0.4s ease;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  width: 100%;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  position: relative;
  cursor: pointer;
  
  span {
    color: ${props => props.theme.primary};
  }

  /* Glowing dot at the end of the logo on dark mode */
  &:after {
    content: '';
    position: absolute;
    right: -15px;
    bottom: 5px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${props => props.theme.primary};
    box-shadow: 0 0 10px ${props => props.theme.primary},
                0 0 20px ${props => props.theme.primary};
    opacity: ${props => props.theme.mode === 'dark' ? 1 : 0.5};
    transition: all 0.3s ease;
  }
  
  &:hover::after {
    transform: scale(1.5);
    opacity: 1;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 5px 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after,
  &.active::after {
    width: 100%;
  }
  
  &.active {
    color: ${props => props.theme.primary};
    font-weight: 600;
  }
`;

const ThemeToggle = styled(motion.button)`
  background: transparent;
  border: none;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  
  /* Glassmorphism for theme toggle */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Add transition for icon swap */
  & > * {
    position: absolute;
    transition: all 0.3s ease;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: transparent;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  width: 40px;
  height: 40px;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* Glassmorphism for mobile menu button */
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 75vw;
    max-width: 300px;
    
    /* Glassmorphism for mobile menu */
    background: ${props => props.theme.glass};
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: -10px 0px 30px rgba(0, 0, 0, 0.1);
    
    padding: 2rem;
    z-index: 200;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 4rem;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const NavIndexIndicator = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  color: ${props => props.theme.primary};
  margin-right: 0.5rem;
  font-family: 'Courier New', monospace;
`;

const MobileNavLink = styled(motion.a)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &.active {
    color: ${props => props.theme.primary};
    font-weight: 600;
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 150;
`;

const ScrollIndicator = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 50;
  opacity: ${props => props.$scrolled ? 0 : 1};
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const ScrollText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${props => props.theme.text};
  opacity: 0.7;
`;

const ChevronContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.div.attrs(props => ({
  style: {
    transform: `scaleX(${props.$scrollProgress})`,
    opacity: props.$scrolled ? 1 : 0
  }
}))`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${props => props.theme.primary};
  transform-origin: 0%;
  z-index: 1000;
  transition: opacity 0.3s ease;
`;

const Navbar = ({ toggleTheme, currentTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Optimize the handleScroll function to reduce performance impact
  useEffect(() => {
    // Throttle function to limit execution frequency
    const throttle = (func, limit) => {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };

    const handleScroll = throttle(() => {
      // Update scrolled state
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Calculate scroll progress
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
      
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        // Determine active section
        const sections = document.querySelectorAll('section[id]');
        let currentSection = 'home';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
          }
        });
        
        setActiveSection(currentSection);
      });
    }, 50); // Throttle to max 20 updates per second
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  // Variants for animations
  const menuVariants = {
    closed: { x: '100%', transition: { type: 'tween', ease: 'easeInOut', duration: 0.5 } },
    open: { x: 0, transition: { type: 'tween', ease: 'easeInOut', duration: 0.5 } }
  };
  
  const backdropVariants = {
    closed: { opacity: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, transition: { duration: 0.3 } }
  };
  
  const chevronVariants = {
    initial: { y: -10, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: 0.5,
        duration: 0.5 
      }
    }
  };
  
  const cheveronAnimation = {
    y: [0, 5, 0],
    opacity: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
      duration: 1.5
    }
  };
  
  const navItems = [
    { name: 'Home', link: '#home' },
    { name: 'About', link: '#about' },
    { name: 'Projects', link: '#projects' },
    { name: 'Services', link: '#services' },
    { name: 'Contact', link: '#contact' }
  ];
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <>
      <ProgressBar $scrollProgress={scrollProgress} $scrolled={scrolled} />
      
      <NavbarContainer 
        $scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <NavContent>
          <Logo 
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            PORTFOLIO<span>.</span>
          </Logo>
          
          <NavLinks>
            {navItems.map((item, index) => (
              <NavLink 
                key={item.name}
                href={item.link}
                className={activeSection === item.link.substring(1) ? 'active' : ''}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </NavLink>
            ))}
            
            <ThemeToggle 
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={{ opacity: 1, rotate: 0 }}
                animate={{ 
                  opacity: currentTheme === 'dark' ? 1 : 0,
                  rotate: currentTheme === 'dark' ? 0 : 90
                }}
                transition={{ duration: 0.3 }}
              >
                <Moon size={18} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ 
                  opacity: currentTheme === 'light' ? 1 : 0,
                  rotate: currentTheme === 'light' ? 0 : -90
                }}
                transition={{ duration: 0.3 }}
              >
                <Sun size={18} />
              </motion.div>
            </ThemeToggle>
          </NavLinks>
          
          <MobileMenuButton 
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </MobileMenuButton>
        </NavContent>
      </NavbarContainer>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <Backdrop
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <CloseButtonContainer>
              <MobileMenuButton 
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
              >
                <X size={24} />
              </MobileMenuButton>
            </CloseButtonContainer>
            
            <MobileNavLinks>
              {navItems.map((item, index) => (
                <MobileNavLink 
                  key={item.name}
                  href={item.link}
                  className={activeSection === item.link.substring(1) ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </MobileNavLink>
              ))}
              
              <ThemeToggle 
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ marginLeft: 0, marginTop: '2rem', alignSelf: 'flex-start' }}
                aria-label="Toggle theme"
              >
                {currentTheme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
              </ThemeToggle>
            </MobileNavLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {!scrolled && (
          <ScrollIndicator 
            $scrolled={scrolled}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            variants={chevronVariants}
          >
            <ScrollText>Scroll</ScrollText>
            <ChevronContainer animate={cheveronAnimation}>
              <ChevronDown size={24} />
            </ChevronContainer>
          </ScrollIndicator>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
