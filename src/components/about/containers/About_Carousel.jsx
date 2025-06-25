import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx' 

import slide1 from '../../../assets/images/slide_community.jpg'
import slide2 from '../../../assets/images/slide_projects.jpg'
import slide3 from '../../../assets/images/slide_climate.jpg'

const messages = [
  "Fostering Communities", // Message for slide 1
  "Groundbreaking Projects.", // Message for slide 2
  "Climate Healing", // Message for slide 3
];

const Carousel = () => {
  const slides = [slide1, slide2, slide3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);

  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="sm:max-w-[80vw] max-w=[100vw] h-[780px] w-full m-auto py-16 sm:px-4 px-1 relative group">
      {/* Image background */}
      <div style={{ backgroundImage: `url(${slides[currentIndex]})` }} className="w-full h-full rounded-2xl bg-center bg-cover duration-500 relative">
        {/* Message container */}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-white text-center p-4">
          <div>
            <h4 className="text-white text-2xl font-bold">WE PROMOTE</h4>
            <h3 className="text-white text-5xl font-bold">{messages[currentIndex]}</h3>
          </div>
        </div>
      </div>

      {/* Left button (using React icons) */}
      <div className="hidden group-hover:block absolute top-[50%] left-5 transform -translate-y-1/2 rounded-full p-2 bg-black/20">
        <BsChevronCompactLeft onClick={prevSlide} className="sm:text-5xl text-3xl text-white cursor-pointer" />
      </div>

      {/* Right button */}
      <div className="hidden group-hover:block absolute top-1/2 right-5 transform -translate-y-1/2 rounded-full p-2 bg-black/20">
        <BsChevronCompactRight onClick={nextSlide} className="sm:text-5xl text-3xl text-white cursor-pointer" />
      </div>

      {/* Slide indicators */}
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)} 
            className={`text-2xl cursor-pointer ${currentIndex === slideIndex ? 'text-white bg-green-500 rounded-full' : 'text-black-500'}`}>
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;