import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import { fadeInUp, staggerContainer } from '../utils/animation';

const AboutSection = styled.section`
  position: relative;
  padding: 120px 20px;
  background: var(--bg-secondary);
  overflow: hidden;
  will-change: transform;
`;

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 50%,
    var(--bg-tertiary) 100%
  );
  opacity: 0.8;
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
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  will-change: transform;
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
  max-width: 900px;
  margin: 0 auto 60px;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.8;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  
  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const SkillsContainer = styled(motion.div)`
  flex: 1;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  padding: 30px;
  box-shadow: var(--glass-shadow);
`;

const SkillsTitle = styled(motion.h3)`
  font-size: 1.8rem;
  margin-bottom: 25px;
  color: var(--primary-color);
`;

const SkillCategories = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const SkillCategory = styled(motion.div)`
  margin-bottom: 20px;
`;

const CategoryName = styled(motion.h4)`
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: var(--primary-color);
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const SkillList = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkillTag = styled(motion.span)`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-sm);
  padding: 6px 14px;
  font-size: 0.9rem;
  font-family: var(--font-mono);
  color: var(--text-secondary);
`;

const TimelineContainer = styled(motion.div)`
  flex: 1;
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  will-change: transform;
  contain: content;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20px;
    width: 2px;
    background: var(--primary-color);
    opacity: 0.3;
    
    @media (min-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItemContainer = styled(motion.div)`
  position: relative;
  padding-left: 60px;
  margin-bottom: 40px;
  
  @media (min-width: 768px) {
    padding-left: 80px;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineDot = styled(motion.div)`
  position: absolute;
  left: 13px;
  top: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary-color);
  box-shadow: 0 0 0 4px var(--bg-secondary);
  z-index: 1;
  
  @media (min-width: 768px) {
    left: 23px;
  }
`;

const TimelineDate = styled(motion.div)`
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--primary-color);
  margin-bottom: 8px;
`;

const TimelineTitle = styled(motion.h3)`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-primary);
`;

const TimelineContent = styled(motion.div)`
  background: var(--glass-bg);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
  padding: 20px;
  color: var(--text-secondary);
  line-height: 1.6;
  box-shadow: var(--glass-shadow);
`;

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100], {
    smoothness: 0.6,
  });
  
  const skills = {
    frontend: ["HTML5", "CSS3/SASS", "JavaScript", "TypeScript", "React", "Vue.js", "Next.js", "Framer Motion"],
    backend: ["Node.js", "Express", "Python", "Django", "PHP", "Laravel", "GraphQL", "RESTful APIs"],
    tools: ["Git", "Docker", "Webpack", "Jest", "CI/CD", "Figma", "Adobe XD", "VS Code"]
  };
  
  const timeline = [
    {
      date: "2023 - Present",
      title: "Senior Full Stack Developer",
      description: "Led development of enterprise applications utilizing React, Node.js, and GraphQL. Mentored junior developers and implemented CI/CD pipelines for streamlined deployments."
    },
    {
      date: "2020 - 2023",
      title: "Full Stack Developer",
      description: "Designed and developed responsive web applications, focusing on performance optimization and user experience. Collaborated in agile teams to deliver high-quality software solutions."
    },
    {
      date: "2018 - 2020",
      title: "Frontend Developer",
      description: "Created engaging user interfaces and interactive experiences using modern JavaScript frameworks. Worked closely with designers to implement pixel-perfect layouts."
    }
  ];
  
  return (
    <AboutSection id="about" ref={ref}>
      <GradientBackground />
      <ContentContainer>
        <SectionHeading>
          <PreTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            WHO I AM
          </PreTitle>
          <Title
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            About Me
          </Title>
          <Description
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            I am a passionate developer dedicated to creating seamless digital experiences.
            My expertise spans front-end and back-end technologies, with a strong focus on
            innovation and efficiency in every project I undertake.
          </Description>
        </SectionHeading>
        
        <FlexContainer>
          <SkillsContainer
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SkillsTitle>My Skills</SkillsTitle>
            <SkillCategories variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
              {Object.entries(skills).map(([category, skillList], i) => (
                <SkillCategory key={category} variants={fadeInUp}>
                  <CategoryName>{category.charAt(0).toUpperCase() + category.slice(1)}</CategoryName>
                  <SkillList>
                    {skillList.map((skill, index) => (
                      <SkillTag 
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          y: -5, 
                          backgroundColor: 'var(--primary-color)',
                          color: 'var(--text-on-primary)'
                        }}
                      >
                        {skill}
                      </SkillTag>
                    ))}
                  </SkillList>
                </SkillCategory>
              ))}
            </SkillCategories>
          </SkillsContainer>
          
          <TimelineContainer
            style={{ y }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {timeline.map((item, i) => (
              <TimelineItemContainer 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <TimelineDot 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                />
                <TimelineDate>{item.date}</TimelineDate>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineContent
                  whileHover={{ y: -5, boxShadow: 'var(--card-shadow)' }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{item.description}</p>
                </TimelineContent>
              </TimelineItemContainer>
            ))}
          </TimelineContainer>
        </FlexContainer>
      </ContentContainer>
    </AboutSection>
  );
};

export default About;
