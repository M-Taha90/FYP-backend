/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';

const AnimateSlideText = ({ text }) => {
    const [isVisible, setIsVisible] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (entry.isIntersecting) {
                setIsVisible(true);
              }
            },
            { threshold: 0.5 } // 50% of the component should be visible to trigger
            );
            const currentRef = textRef.current;
            if (currentRef) {
              observer.observe(currentRef);
            }
        
            return () => {
              if (currentRef) {
                observer.unobserve(currentRef);
              }
            };
          }, []);

    return (
        <div
            ref={textRef}
            className={`transition-transform duration-500 ${
                isVisible ? 'animate-slide-bottom' : 'translate-y-full'
            }`}
        >
            {text}
        </div>
    );
};

export default AnimateSlideText;
