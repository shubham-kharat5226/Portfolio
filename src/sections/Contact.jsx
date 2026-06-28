import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { fadeInUp, staggerContainer } from "../utils/animation";
import { FaGithub, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope } from "react-icons/fa";

const ContactSection = styled.section`
  position: relative;
  padding: 120px 20px;
  background: var(--bg-secondary);
  overflow: hidden;
  /* Ensure the element has appropriate stacking context for scroll measurements */
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
    var(--bg-secondary) 0%,
    var(--bg-primary) 100%
  );
  z-index: -1;
`;

const BackgroundEffects = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: var(--primary-color);
  opacity: 0.05;
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
  padding: 20px;
  box-shadow: var(--glass-shadow);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-on-primary);
  font-size: 1.2rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--text-primary);
`;

const InfoText = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
`;

const Form = styled(motion.form)`
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  padding: 30px;
  box-shadow: var(--glass-shadow);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled(motion.div)`
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  left: 15px;
  top: ${({ $focus, $value }) => ($focus || $value ? '-12px' : '50%')};
  transform: ${({ $focus, $value }) => ($focus || $value ? 'translateY(0)' : 'translateY(-50%)')};
  background: ${({ $focus, $value }) => ($focus || $value ? 'var(--glass-bg)' : 'transparent')};
  padding: ${({ $focus, $value }) => ($focus || $value ? '0 8px' : '0')};
  font-size: ${({ $focus, $value }) => ($focus || $value ? '0.8rem' : '1rem')};
  color: ${({ $focus }) => ($focus ? 'var(--primary-color)' : 'var(--text-secondary)')};
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  background: transparent;
  border: 2px solid ${({ $focus }) => ($focus ? 'var(--primary-color)' : 'var(--glass-border)')};
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  outline: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--primary-color);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 15px;
  background: transparent;
  border: 2px solid ${({ $focus }) => ($focus ? 'var(--primary-color)' : 'var(--glass-border)')};
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  outline: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  resize: none;
  min-height: 150px;
  
  &:focus {
    border-color: var(--primary-color);
  }
`;

const Button = styled(motion.button)`
  background: var(--primary-color);
  color: var(--text-on-primary);
  border: none;
  border-radius: var(--border-radius-md);
  padding: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  
  &:before {
    content: '';
    position: absolute;
    left: -100%;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--secondary-color);
    transition: transform 0.5s ease;
    z-index: -1;
  }
  
  &:hover:before {
    transform: translateX(100%);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 60px;
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-color);
    color: var(--text-on-primary);
    transform: translateY(-10px);
  }
`;

const SuccessMessage = styled(motion.div)`
  background: var(--success-color);
  color: var(--text-on-primary);
  padding: 15px;
  border-radius: var(--border-radius-md);
  text-align: center;
  margin-top: 20px;
  box-shadow: var(--card-shadow);
`;

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50], {
    smoothness: 0.4,
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset form submission status after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }, 1000);
  };
  
  const contactInfo = [
    {
      title: "Email",
      text: "shubhamkharat5226@gmail.com",
      icon: <FaEnvelope />,
    },
    {
      title: "Location",
      text: "India, Maharashtra, Buldhana",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>,
    },
  ];
  
  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/"},
  ];
  
  return (
    <ContactSection id="contact" ref={ref}>
      <GradientBackground />
      <BackgroundEffects>
        <BackgroundShape
          style={{ 
            width: '400px', 
            height: '400px', 
            top: '10%', 
            right: '5%',
            opacity: 0.05
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
            transition: {
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }
          }}
        />
        <BackgroundShape
          style={{ 
            width: '300px', 
            height: '300px', 
            bottom: '20%', 
            left: '10%',
            opacity: 0.05
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, -15, 0],
            transition: {
              duration: 25,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }
          }}
        />
      </BackgroundEffects>
      <ContentContainer>
        <SectionHeading style={{ y }}>
          <PreTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            GET IN TOUCH
          </PreTitle>
          <Title
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contact Me
          </Title>
          <Description
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Have a project in mind or want to explore collaboration opportunities? 
            Feel free to reach out, and I'll get back to you as soon as possible.
          </Description>
        </SectionHeading>
        
        <ContactGrid>
          <ContactInfo
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <InfoCard
                key={info.title}
                variants={fadeInUp}
                whileHover={{ x: 10 }}
              >
                <IconContainer>{info.icon}</IconContainer>
                <InfoContent>
                  <InfoTitle>{info.title}</InfoTitle>
                  <InfoText>{info.text}</InfoText>
                </InfoContent>
              </InfoCard>
            ))}
            
            <motion.div 
              variants={fadeInUp}
              style={{ 
                height: '300px', 
                borderRadius: 'var(--border-radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--glass-shadow)'
              }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.2184890123456!2d76.2595453!3d19.9458014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bda7ad1ee806b93%3A0xc655684f7c76ab8b!2sJambhora%2C%20Maharashtra%20443308!5e0!3m2!1sen!2sin!4v1234567890" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </motion.div>
          </ContactInfo>
          
          <Form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
          >
            <InputGroup>
              <Label 
                $focus={focusedField === "name"} 
                $value={formData.name}
              >
                Your Name
              </Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                $focus={focusedField === "name"}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label 
                $focus={focusedField === "email"} 
                $value={formData.email}
              >
                Your Email
              </Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                $focus={focusedField === "email"}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label 
                $focus={focusedField === "subject"} 
                $value={formData.subject}
              >
                Subject
              </Label>
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => handleFocus("subject")}
                onBlur={handleBlur}
                $focus={focusedField === "subject"}
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Label 
                $focus={focusedField === "message"} 
                $value={formData.message}
              >
                Your Message
              </Label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                $focus={focusedField === "message"}
                required
              />
            </InputGroup>
            
            <Button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
            >
              Send Message
            </Button>
            
            <AnimatePresence>
              {formSubmitted && (
                <SuccessMessage
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  Your message has been sent successfully! I'll get back to you soon.
                </SuccessMessage>
              )}
            </AnimatePresence>
          </Form>
        </ContactGrid>
        
        <SocialLinks
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {socialLinks.map((link, index) => (
            <SocialLink
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -10, backgroundColor: 'var(--primary-color)', color: 'var(--text-on-primary)' }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
            </SocialLink>
          ))}
        </SocialLinks>
      </ContentContainer>
    </ContactSection>
  );
};

export default Contact;
