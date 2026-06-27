import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Calendar, MapPin, Briefcase, ChevronRight } from "lucide-react";

const TimelineContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  margin: 0 0 40px 0;
  padding-left: 60px;

  &::before {
    content: "";
    position: absolute;
    left: 18px;
    top: 0;
    width: 2px;
    height: calc(100% + 40px);
    background: ${props => props.theme.primary}30;
    z-index: 1;
  }
  
  &:last-child::before {
    height: 100%;
  }
`;

const Circle = styled(motion.div)`
  width: 36px;
  height: 36px;
  background: ${props => props.theme.glass};
  border: 2px solid ${props => props.theme.primary};
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Subtle glow effect */
  box-shadow: 0 0 15px ${props => props.theme.primary}30;
  
  /* Glass effect */
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const IconContainer = styled.div`
  color: ${props => props.theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled(motion.div)`
  background: ${props => props.theme.glass};
  padding: 25px;
  border-radius: 10px;
  box-shadow: ${props => props.theme.shadow};
  width: 100%;
  position: relative;
  z-index: 2;
  overflow: hidden;
  
  /* Glass effect */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Highlight border on hover */
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${props => props.theme.primary};
    transition: transform 0.3s ease;
    transform: scaleY(0);
    transform-origin: bottom;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadowHover};
    
    &:before {
      transform: scaleY(1);
    }
  }
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 15px;
  font-size: 0.85rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${props => props.theme.secondary};
  
  svg {
    color: ${props => props.theme.primary};
    opacity: 0.8;
  }
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${props => props.theme.secondary};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
`;

const Tag = styled(motion.span)`
  background: ${props => props.theme.primary}15;
  color: ${props => props.theme.primary};
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 15px;
  font-weight: 500;
`;

const ReadMore = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  padding: 0;
  margin-top: 15px;
  color: ${props => props.theme.primary};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  
  svg {
    transition: transform 0.2s ease;
  }
  
  &:hover svg {
    transform: translateX(3px);
  }
`;

const TimelineItem = ({ 
  title, 
  description, 
  date, 
  location, 
  company,
  tags = [],
  icon,
  onReadMore,
  index = 0
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        delay: index * 0.2, 
        ease: "easeOut" 
      }
    }
  };
  
  const circleVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        delay: (index * 0.2) + 0.3,
        type: "spring",
        stiffness: 200
      }
    }
  };
  
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: (index * 0.2) + 0.6 + (i * 0.05),
        duration: 0.3
      }
    })
  };
  
  // Get the appropriate icon
  const Icon = icon || Briefcase;
  
  return (
    <TimelineContainer>
      <Circle
        variants={circleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{ scale: 1.1 }}
      >
        <IconContainer>
          <Icon size={16} />
        </IconContainer>
      </Circle>
      
      <Content
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Title>{title}</Title>
        
        <MetaContainer>
          {date && (
            <MetaItem>
              <Calendar size={14} />
              <span>{date}</span>
            </MetaItem>
          )}
          
          {location && (
            <MetaItem>
              <MapPin size={14} />
              <span>{location}</span>
            </MetaItem>
          )}
          
          {company && (
            <MetaItem>
              <Briefcase size={14} />
              <span>{company}</span>
            </MetaItem>
          )}
        </MetaContainer>
        
        <Description>{description}</Description>
        
        {tags.length > 0 && (
          <Tags>
            {tags.map((tag, i) => (
              <Tag 
                key={i}
                custom={i}
                variants={tagVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                {tag}
              </Tag>
            ))}
          </Tags>
        )}
        
        {onReadMore && (
          <ReadMore onClick={onReadMore}>
            Read More <ChevronRight size={14} />
          </ReadMore>
        )}
      </Content>
    </TimelineContainer>
  );
};

export default TimelineItem;
