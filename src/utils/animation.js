/**
 * Animation utilities for the portfolio website
 * Contains reusable Framer Motion animation variants
 */

// Stagger container for parent elements
export const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  // Basic fade in animation (up direction)
  export const fadeInUp = {
    initial: {
      y: 30,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  // Basic fade in animation (down direction)
  export const fadeInDown = {
    initial: {
      y: -30,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  // Basic fade in animation (left direction)
  export const fadeInLeft = {
    initial: {
      x: -30,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  // Basic fade in animation (right direction)
  export const fadeInRight = {
    initial: {
      x: 30,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  // Scale up animation
  export const scaleUp = {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  // Text reveal animation with staggered children
  export const textVariants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  };
  
  // Letter animation for text effects
  export const letterAnimation = {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  };
  
  // Parallax scroll effect
  export const parallax = (speed = 0.1) => ({
    initial: {},
    animate: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 10,
        damping: 20,
      },
    },
    exit: {},
    hover: {},
    whileInView: {
      y: [`${-10 * speed}%`, `${10 * speed}%`],
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 2,
        ease: "easeInOut",
      },
    },
  });
  
  // Card hover effect
  export const cardHover = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)",
    },
    hover: {
      scale: 1.03,
      y: -5,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
  };
  
  // Page transition for route changes
  export const pageTransition = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  
  // Scroll reveal animations for sections
  export const scrollReveal = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  
  // Theme toggle animation
  export const themeToggle = {
    light: {
      rotate: 0,
      scale: 1,
    },
    dark: {
      rotate: 180,
      scale: 1,
    },
    transition: {
      duration: 0.5,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  };
  
  // Button hover animation
  export const buttonAnimation = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
  };
  
  // Modal animation
  export const modalAnimation = {
    initial: {
      opacity: 0,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };