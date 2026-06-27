import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element is in the viewport
 * 
 * @param {React.RefObject} ref - The ref object attached to the DOM element you want to observe
 * @param {Object} options - Configuration options for the hook
 * @param {number} options.threshold - Value between 0 and 1 indicating the percentage of the element that needs to be visible
 * @param {boolean} options.once - If true, will only trigger once when element comes into view
 * @param {string} options.rootMargin - CSS margin-like string to grow/shrink the root observation area
 * @returns {boolean} - True if the element is in view, false otherwise
 */
export const useInView = (ref, options = {}) => {
  const { 
    threshold = 0.1, 
    once = true,
    rootMargin = '0px'
  } = options;
  
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    // Store the current ref value to use in the cleanup function
    const currentRef = ref.current;
    
    // Don't do anything if the ref is not attached to an element
    if (!currentRef) return;

    // Disconnect any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new IntersectionObserver
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        // Update state when the element comes into view
        if (entry.isIntersecting) {
          setIsInView(true);
          
          // If the 'once' option is true, disconnect the observer after the element is in view
          if (once) {
            observerRef.current.disconnect();
          }
        } else if (!once) {
          // If 'once' is false, we need to update the state when the element leaves the viewport
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    // Start observing the element
    observerRef.current.observe(currentRef);

    // Clean up the observer when the component unmounts
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, threshold, once, rootMargin]);

  return isInView;
};

/**
 * Alternative hook that returns a ref and an isInView boolean
 * Useful when you don't want to create a ref in advance
 * 
 * @param {Object} options - Configuration options for the hook (same as useInView)
 * @returns {Array} - [ref, isInView] where ref is a React ref object and isInView is a boolean
 */
export const useInViewRef = (options = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, options);
  
  return [ref, isInView];
};

export default useInView;