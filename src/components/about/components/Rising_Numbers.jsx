/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';

const RisingNumbers = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.7 } // 50% of the component should be visible to trigger
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = end / (duration * 1000 / 16); // Calculate increment per frame (16ms for 60fps)
      
      const animate = () => {
        start += increment;
        if (start < end) {
          setCount(Math.ceil(start)); // Update count
          requestAnimationFrame(animate); // Continue the animation
        } else {
          setCount(end); // Ensure the final value is correct
        }
      };

      requestAnimationFrame(animate); // Start the animation
    }
  }, [isVisible, end, duration]);

  return (
    <div ref={ref}>
      {count}
    </div>
  );
};

export default RisingNumbers;