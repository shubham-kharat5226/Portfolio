// src/components/ProjectModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, User, ChevronLeft, ChevronRight, Code, Star, Eye } from 'lucide-react';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 1rem;
    align-items: flex-start;
    overflow-y: auto;
  }
`;

const ModalContainer = styled(motion.div)`
  background: ${props => props.theme.backgroundAlt};
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* Glass effect for modal */
  background: ${props => `rgba(${props.theme.mode === 'dark' ? '30, 30, 30' : '255, 255, 255'}, 0.9)`};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    max-height: none;
    margin: 3rem 0;
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.theme.backgroundAlt};
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: ${props => props.theme.text};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ModalContent = styled.div`
  overflow-y: auto;
  max-height: calc(90vh - 4rem);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary}40;
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    max-height: none;
  }
`;

const ImageGallery = styled.div`
  width: 100%;
  position: relative;
  height: 500px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const MainImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GalleryNavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  z-index: 5;
  
  &.prev {
    left: 1rem;
  }
  
  &.next {
    right: 1rem;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const GalleryIndicators = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  z-index: 5;
`;

const Indicator = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: white;
  opacity: ${props => props.active ? 1 : 0.5};
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
    transform: scale(1.2);
  }
  
  &:active {
    transform: scale(0.9);
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  overflow-x: auto;
  background: ${props => props.theme.background};
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary}40;
    border-radius: 4px;
  }
`;

const Thumbnail = styled(motion.img)`
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  
  &.active {
    border-color: ${props => props.theme.primary};
  }
`;

const ProjectDetails = styled.div`
  padding: 2rem;
`;

const ProjectTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${props => props.theme.primary};
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.secondary};
  font-size: 0.9rem;
`;

const MetaItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Description = styled.div`
  margin-bottom: 2rem;
  line-height: 1.7;
  color: ${props => props.theme.text};
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 30px;
    height: 2px;
    background: ${props => props.theme.primary};
  }
`;

const FeaturesList = styled(motion.ul)`
  margin-bottom: 2rem;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 0.5rem;
    
    &::before {
      content: '';
      position: absolute;
      left: -1rem;
      top: 0.6rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${props => props.theme.primary};
    }
  }
`;

const FeatureItem = styled(motion.li)`
  opacity: 0;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-bottom: 2rem;
`;

const Tag = styled(motion.span)`
  background: ${props => `${props.theme.primary}20`};
  color: ${props => props.theme.primary};
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-weight: 500;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const Button = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &.primary {
    background: ${props => props.theme.primary};
    color: ${props => props.theme.mode === 'dark' ? props.theme.background : '#fff'};
    
    &:hover {
      box-shadow: 0 5px 15px ${props => `${props.theme.primary}50`};
    }
  }
  
  &.secondary {
    background: transparent;
    color: ${props => props.theme.text};
    border: 1px solid ${props => props.theme.border};
    
    &:hover {
      background: ${props => props.theme.backgroundDark};
    }
  }
`;

const PositionIndicator = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 5;
`;

const ProjectModal = ({ project, closeModal }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef();
  
  // If project has no images gallery, set a default
  const images = project.images && project.images.length > 0 
    ? project.images 
    : [project.image];
  
  // Navigate to next/previous image
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeModal]);
  
  // Handle keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  
  // Click outside to close
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { 
      scale: 0.9, 
      opacity: 0,
      y: 20
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        damping: 25, 
        stiffness: 500,
        mass: 0.8
      }
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      y: 20,
      transition: { 
        duration: 0.2, 
        ease: 'easeInOut' 
      }
    }
  };
  
  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };
  
  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2 + (i * 0.05),
        duration: 0.3,
        ease: 'easeOut'
      }
    })
  };
  
  const metaVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + (i * 0.1),
        duration: 0.4,
        ease: 'easeOut'
      }
    })
  };
  
  const galleryVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };
  
  return (
    <ModalOverlay 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOverlayClick}
    >
      <ModalContainer
        ref={modalRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <CloseButton 
          onClick={closeModal}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close modal"
        >
          <X size={18} />
        </CloseButton>
        
        <ModalContent>
          <ImageGallery>
            <PositionIndicator>
              {currentImageIndex + 1} / {images.length}
            </PositionIndicator>
            
            <AnimatePresence initial={false} custom={currentImageIndex}>
              <MainImage
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`${project.title} - image ${currentImageIndex + 1}`}
                custom={currentImageIndex}
                variants={galleryVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 100 && currentImageIndex > 0) {
                    prevImage();
                  } else if (info.offset.x < -100 && currentImageIndex < images.length - 1) {
                    nextImage();
                  }
                }}
              />
            </AnimatePresence>
            
            {images.length > 1 && (
              <>
                <GalleryNavButton 
                  className="prev"
                  onClick={prevImage}
                  disabled={currentImageIndex === 0}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </GalleryNavButton>
                
                <GalleryNavButton 
                  className="next"
                  onClick={nextImage}
                  disabled={currentImageIndex === images.length - 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </GalleryNavButton>
                
                <GalleryIndicators>
                  {images.map((_, index) => (
                    <Indicator
                      key={index}
                      active={index === currentImageIndex}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </GalleryIndicators>
              </>
            )}
          </ImageGallery>
          
          {images.length > 1 && (
            <ThumbnailContainer>
              {images.map((img, index) => (
                <Thumbnail
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={index === currentImageIndex ? 'active' : ''}
                  onClick={() => setCurrentImageIndex(index)}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </ThumbnailContainer>
          )}
          
          <ProjectDetails>
            <ProjectTitle>{project.title}</ProjectTitle>
            
            <ProjectMeta>
              {project.date && (
                <MetaItem 
                  custom={0}
                  variants={metaVariants}
                  initial="hidden" 
                  animate="visible"
                >
                  <Calendar size={16} />
                  <span>{project.date}</span>
                </MetaItem>
              )}
              
              {project.client && (
                <MetaItem 
                  custom={1}
                  variants={metaVariants}
                  initial="hidden" 
                  animate="visible"
                >
                  <User size={16} />
                  <span>{project.client}</span>
                </MetaItem>
              )}
              
              {project.category && (
                <MetaItem 
                  custom={2}
                  variants={metaVariants}
                  initial="hidden" 
                  animate="visible"
                >
                  <Code size={16} />
                  <span>{project.category}</span>
                </MetaItem>
              )}
              
              {project.stars && (
                <MetaItem 
                  custom={3}
                  variants={metaVariants}
                  initial="hidden" 
                  animate="visible"
                >
                  <Star size={16} />
                  <span>{project.stars} stars</span>
                </MetaItem>
              )}
              
              {project.views && (
                <MetaItem 
                  custom={4}
                  variants={metaVariants}
                  initial="hidden" 
                  animate="visible"
                >
                  <Eye size={16} />
                  <span>{project.views} views</span>
                </MetaItem>
              )}
            </ProjectMeta>
            
            <Description>{project.fullDescription || project.description}</Description>
            
            {project.features && project.features.length > 0 && (
              <>
                <SectionTitle>Key Features</SectionTitle>
                <FeaturesList>
                  {project.features.map((feature, index) => (
                    <FeatureItem
                      key={index}
                      custom={index}
                      variants={featureVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {feature}
                    </FeatureItem>
                  ))}
                </FeaturesList>
              </>
            )}
            
            {project.tags && project.tags.length > 0 && (
              <>
                <SectionTitle>Technologies</SectionTitle>
                <TagsContainer>
                  {project.tags.map((tag, index) => (
                    <Tag
                      key={index}
                      custom={index}
                      variants={tagVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {tag}
                    </Tag>
                  ))}
                </TagsContainer>
              </>
            )}
            
            <ButtonsContainer>
              {project.liveLink && (
                <Button 
                  href={project.liveLink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={16} />
                  View Live Demo
                </Button>
              )}
              
              {project.github && (
                <Button 
                  href={project.github} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={16} />
                  View on GitHub
                </Button>
              )}
            </ButtonsContainer>
          </ProjectDetails>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProjectModal;