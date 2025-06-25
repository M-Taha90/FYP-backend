import { useState, useEffect, useRef } from 'react';

// eslint-disable-next-line react/prop-types
const AnimatedText = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Adjust this to control when the element is considered visible (50% visibility here)
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={textRef}
      className={`transition-opacity duration-500 ease-in-out ${
        isVisible ? 'animate-slide-bottom' : 'opacity-0'
      }`}
    >
      <h1 className="text-6xl text-white font-bold font-nunito">
        {text}
      </h1>
    </div>
  );
};

export default AnimatedText;
