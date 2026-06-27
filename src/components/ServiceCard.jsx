import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";

const Card = styled(motion.div)`
  background: ${props => props.theme.glass};
  color: ${props => props.theme.text};
  padding: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  height: 100%;
  
  /* Glass effect */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${props => props.theme.shadow};
  
  /* Ensure content is above the gradient */
  & > * {
    position: relative;
    z-index: 2;
  }
`;

const BackgroundGradient = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const IconWrapper = styled(motion.div)`
  background: ${props => props.theme.primary}20;
  color: ${props => props.theme.primary};
  border-radius: 16px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
`;

const IconBackground = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: ${props => props.theme.primary};
  transform-origin: left;
  transform: scaleX(0);
  
  ${Card}:hover & {
    animation: fillBackground 0.5s ease forwards;
  }
  
  @keyframes fillBackground {
    to {
      transform: scaleX(1);
    }
  }
`;

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
  background: linear-gradient(
    to right,
    ${props => props.theme.text},
    ${props => props.theme.text}
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  transition: all 0.6s ease;
  
  ${Card}:hover & {
    background-position: 0 0;
    color: ${props => props.theme.primary};
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${props => props.theme.secondary};
  margin-bottom: 20px;
  flex-grow: 1;
`;

const LearnMore = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${props => props.theme.primary};
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: auto;
  width: fit-content;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  ${Card}:hover svg {
    transform: translateX(4px);
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  
  li {
    padding-left: 18px;
    position: relative;
    margin-bottom: 8px;
    font-size: 0.9rem;
    
    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${props => props.theme.primary};
    }
  }
`;

const ServiceCard = ({ 
  title, 
  description, 
  Icon, 
  features = [],
  onClick,
  index = 0
}) => {
  // Mouse position for gradient effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  const background = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      ${props => `${props.theme.primary}15`} 0%,
      transparent 80%
    )
  `;
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut" 
      } 
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0, rotate: -15 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        delay: (index * 0.1) + 0.2,
        duration: 0.4
      } 
    }
  };

  return (
    <Card
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <BackgroundGradient style={{ background }} />
      
      <IconWrapper
        variants={iconVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <IconBackground />
        <Icon 
          size={28} 
          style={{ 
            position: 'relative', 
            zIndex: 2,
            transition: 'color 0.3s ease',
            color: 'currentColor'
          }}
        />
      </IconWrapper>
      
      <Title>{title}</Title>
      <Description>{description}</Description>
      
      {features.length > 0 && (
        <FeatureList>
          {features.map((feature, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  delay: (index * 0.1) + 0.4 + (i * 0.1), 
                  duration: 0.3 
                }
              }}
              viewport={{ once: true }}
            >
              {feature}
            </motion.li>
          ))}
        </FeatureList>
      )}
      
      <LearnMore whileHover={{ x: 5 }}>
        Learn more <ArrowRight size={16} />
      </LearnMore>
    </Card>
  );
};

export default ServiceCard;
