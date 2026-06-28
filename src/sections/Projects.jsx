import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import styled from "styled-components";
import { fadeInUp, staggerContainer } from '../utils/animation';
import { projectsData } from "../data";

const ProjectsSection = styled.section`
  position: relative;
  padding: 120px 20px;
  background: var(--bg-secondary);
  overflow: hidden;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--bg-secondary) 0%,
    var(--bg-tertiary) 100%
  );
  z-index: -1;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionHeading = styled(motion.div)`
  text-align: center;
  margin-bottom: 60px;
`;

const PreTitle = styled(motion.span)`
  font-family: var(--font-mono);
  color: var(--primary-color);
  font-size: 1.1rem;
  display: block;
  margin-bottom: 0.5rem;
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--text-primary);
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--primary-color);
    border-radius: 2px;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto 60px;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.8;
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 40px;
`;

const FilterButton = styled(motion.button)`
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--glass-bg)'};
  color: ${props => props.active ? 'var(--text-on-primary)' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--glass-border)'};
  border-radius: var(--border-radius-md);
  padding: 8px 18px;
  font-size: 0.9rem;
  font-family: var(--font-mono);
  cursor: pointer;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const GridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  &:hover:before {
    opacity: 1;
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProjectInfo = styled.div`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 15px;
  line-height: 1.6;
  flex-grow: 1;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const ProjectTag = styled.span`
  background: var(--glass-bg);
  border-radius: var(--border-radius-sm);
  padding: 4px 10px;
  font-size: 0.8rem;
  color: var(--primary-color);
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  z-index: 2;
  pointer-events: none;
  
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProjectActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const ActionButton = styled(motion.button)`
  background: var(--primary-color);
  color: var(--text-on-primary);
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 8px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: var(--secondary-color);
  }
`;

const ViewMore = styled(motion.button)`
  background: var(--glass-bg);
  color: var(--text-primary);
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius-md);
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  margin: 60px auto 0;
  display: block;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-color);
    color: var(--text-on-primary);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Projects = ({ setSelectedProject }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [hoveredProject, setHoveredProject] = useState(null);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Filters
  const filters = ["all", "web", "ui/ux"];
  
  // Filter projects
  const filteredProjects = activeFilter === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeFilter);
  
  // Show more projects
  const handleShowMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  return (
    <ProjectsSection id="projects" ref={ref}>
      <GradientOverlay />
      <ContentContainer>
        <SectionHeading>
          <PreTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            MY WORK
          </PreTitle>
          <Title
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Recent Projects
          </Title>
          <Description
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore my latest creative work. Each project represents a unique challenge
            and showcases different skills and technologies.
          </Description>
        </SectionHeading>
        
        <FilterContainer
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {filters.map((filter, index) => (
            <FilterButton
              key={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.toUpperCase()}
            </FilterButton>
          ))}
        </FilterContainer>
        
        <GridContainer
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard
              key={project.id}
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
            >
              <ProjectImageContainer>
                <ProjectImage src={project.image} alt={project.title} />
              </ProjectImageContainer>
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTags>
                  {project.tags && project.tags.map(tag => (
                    <ProjectTag key={tag}>{tag}</ProjectTag>
                  ))}
                </ProjectTags>
                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <ProjectOverlay
                      variants={overlayVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <p>Click to view project details</p>
                    </ProjectOverlay>
                  )}
                </AnimatePresence>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </GridContainer>
        
        {visibleProjects < filteredProjects.length && (
          <ViewMore
            onClick={handleShowMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View More
          </ViewMore>
        )}
      </ContentContainer>
    </ProjectsSection>
  );
};

export default Projects;
