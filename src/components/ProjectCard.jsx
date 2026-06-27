// src/components/ProjectCard.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const Card = styled(motion.div)`
  background: ${props => props.theme.backgroundAlt};
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  height: 100%;
  
  /* Glass effect */
  background: ${props => `rgba(${props.theme === 'dark' ? '30, 30, 30' : '255, 255, 255'}, 0.1)`};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: ${props => props.theme.shadow};
  
  /* Transition */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
`;

const ProjectImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.7)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const Content = styled.div`
  padding: 1.5rem;
  position: relative;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.primary};
    transition: width 0.3s ease;
  }
  
  ${Card}:hover &:after {
    width: 100%;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.secondary};
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background: ${props => `${props.theme.primary}20`};
  color: ${props => props.theme.primary};
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  color: ${props => props.theme.text};
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateY(-3px);
  }
`;

const ViewButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.theme.background};
  color: ${props => props.theme.primary};
  border: 2px solid ${props => props.theme.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 10;
  
  ${Card}:hover & {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  
  &:hover {
    background: ${props => props.theme.primary};
    color: ${props => props.theme.background};
  }
`;

const ProjectCard = ({ project, setSelectedProject }) => {
  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <ImageContainer>
        <ProjectImage src={project.image} alt={project.title} />
        <Overlay />
        <ViewButton onClick={() => setSelectedProject(project)}>
          View Project <ArrowUpRight size={16} />
        </ViewButton>
      </ImageContainer>
      
      <Content>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
        
        <TagsContainer>
          {project.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
        
        <ButtonContainer>
          {project.liveLink && (
            <Button 
              href={project.liveLink} 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Live Demo <ExternalLink size={16} />
            </Button>
          )}
          
          {project.github && (
            <Button 
              href={project.github} 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Github <Github size={16} />
            </Button>
          )}
        </ButtonContainer>
      </Content>
    </Card>
  );
};

export default ProjectCard;