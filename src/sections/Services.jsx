import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import { fadeInUp, staggerContainer } from "../utils/animation";
import { servicesData } from "../data";

// Import icons from lucide-react
import { Code, Palette, Layout, Lightbulb, Smartphone, Globe, LineChart, Zap } from "lucide-react";

const ServicesSection = styled.section`
  position: relative;
  padding: 120px 20px;
  background: var(--bg-tertiary);
  overflow: hidden;
  /* Ensure the element has appropriate stacking context for scroll measurements */
  will-change: transform;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(var(--glass-border) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.2;
  z-index: 0;
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
  max-width: 700px;
  margin: 0 auto 60px;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.8;
`;

const GridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
`;

const ServiceCard = styled(motion.div)`
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  padding: 30px;
  box-shadow: var(--glass-shadow);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: var(--primary-color);
    transition: height 0.3s ease;
  }
  
  &:hover:before {
    height: 100%;
  }
`;

const IconWrapper = styled(motion.div)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--primary-color);
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
    background: var(--primary-color);
    transform: scale(0);
    transform-origin: center;
    border-radius: 50%;
    transition: transform 0.3s ease;
    z-index: -1;
  }
  
  ${ServiceCard}:hover &:before {
    transform: scale(1);
  }
  
  ${ServiceCard}:hover & {
    color: var(--text-on-primary);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--text-primary);
  position: relative;
  padding-bottom: 15px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  ${ServiceCard}:hover &:after {
    width: 80px;
  }
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
  flex-grow: 1;
`;

const LearnMore = styled(motion.a)`
  font-size: 0.9rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  ${ServiceCard}:hover &:after {
    width: 100%;
  }
`;

const FloatingShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Shape = styled(motion.div)`
  position: absolute;
  border-radius: ${props => props.radius};
  background: ${props => props.color};
  opacity: 0.05;
`;

const Services = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100], {
    smoothness: 0.4,
  });
  
  // Get icon component by name
  const getIcon = (iconName) => {
    const icons = {
      "icon-name-1": <Code size={32} />,
      "icon-name-2": <Layout size={32} />,
      "icon-name-3": <Palette size={32} />,
      "icon-name-4": <Smartphone size={32} />,
      "icon-name-5": <Globe size={32} />,
      "icon-name-6": <LineChart size={32} />,
      "icon-name-7": <Lightbulb size={32} />,
      "icon-name-8": <Zap size={32} />
    };
    
    return icons[iconName] || <Code size={32} />;
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };
  
  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };
  
  return (
    <ServicesSection id="services" ref={ref}>
      <BackgroundPattern />
      <FloatingShapes>
        {[...Array(6)].map((_, i) => (
          <Shape
            key={i}
            radius={i % 2 === 0 ? '50%' : `${Math.random() * 20 + 10}% ${Math.random() * 20 + 10}% ${Math.random() * 20 + 10}% ${Math.random() * 20 + 10}%`}
            color={i % 3 === 0 ? 'var(--primary-color)' : (i % 3 === 1 ? 'var(--secondary-color)' : 'var(--accent-color)')}
            style={{
              width: 80 + Math.random() * 100,
              height: 80 + Math.random() * 100,
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
              opacity: 0.04 + Math.random() * 0.06
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
              transition: {
                duration: 15 + Math.random() * 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </FloatingShapes>
      <ContentContainer>
        <SectionHeading style={{ y }}>
          <PreTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            WHAT I OFFER
          </PreTitle>
          <Title
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            My Services
          </Title>
          <Description
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            I provide tailored solutions designed to meet your specific needs. Every service is delivered with a focus on quality, efficiency, and innovation.
          </Description>
        </SectionHeading>
        
        <GridContainer
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              custom={index}
              variants={cardVariants}
            >
              <IconWrapper
                variants={iconVariants}
                whileHover={{ rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {getIcon(service.icon)}
              </IconWrapper>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <LearnMore
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </LearnMore>
            </ServiceCard>
          ))}
        </GridContainer>
      </ContentContainer>
    </ServicesSection>
  );
};

export default Services;
