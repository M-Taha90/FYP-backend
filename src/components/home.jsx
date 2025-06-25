import React, { useEffect, useState, useRef } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import './styles.css';
import AOS from "aos";
import "aos/dist/aos.css";



const blogs = [
  {
    title: "Karachi's urban forest initiatives",
    date: '18 Oct 2023 - by Shabina Faraz',
    description: 'Regarding urban forests and tree planting, Hussain emphasises the need for a dual approach to transform Karachi into a habitable city. In..',
    image: '/assets/images/blog 3.png',
    link: 'https://afpak.boell.org/en/2023/10/18/karachis-urban-forest-initiatives',
  },
  {
    title: 'Plant-a-tree for Karachi',
    date: '22 Oct 2020 - by Hatim Mustafa',
    description: "Some of trees that are well accustomed to Karachi's climate are; the fabled moringa tree, neem tree, flame of the jungle, jamun tree. The...",
    image: '/assets/images/blog 1.png',
    link: 'https://www.linkedin.com/pulse/plant-a-tree-karachi-hatim-mustafa',
  },
  {
    title: 'Dear Karachiites, before you plant trees, think',
    date: '09 Aug 2015 - by Farahnaz Moazzam',
    description: 'Few people recognise the impact of planting a tree today that could potentially save lives decades later...',
    image: '/assets/images/blog 2.png',
    link: 'https://tribune.com.pk/article/28894/dear-karachiites-before-you-plant-trees-think',
  }
];

const logos = [
  {
    name: 'Easypaisa',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Easypaisa_Logo.svg/1024px-Easypaisa_Logo.svg.png', // Easypaisa logo
  },
  {
    name: 'Jazzcash',
    imgSrc: 'https://seeklogo.com/images/J/jazzcash-logo-D64096ECA5-seeklogo.com.png', // Jazzcash logo
  },
  {
    name: 'PayPal',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg', // PayPal logo
  },
  {
    name: 'Stripe',
    imgSrc: 'https://seeklogo.com/vector-logo/290635/stripe', // Stripe logo
  },
];

const images = [
  "/assets/images/project.jpg",
  "/assets/images/payment1.jpg",
  "/assets/images/children1.jpg",
  "/assets/images/donate1.jpg",
];

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: true, // Only animate once per scroll
    });
  }, []);

  // Trigger the visibility state after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay to allow the animation to start smoothly
    return () => clearTimeout(timer);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: '/assets/images/plant1.jpg',
      heading: 'Help Us Plant A Greener Future',
      subtext: 'Make a lasting impact',
    },
    {
      image: '/assets/images/white-plant (2).jpg',
      heading: 'Together, We Can Save the Planet',
      subtext: 'Join our mission for a better tomorrow',
    },
    {
      image: '/assets/images/green-plant (1).jpg',
      heading: 'Green Earth, Bright Future',
      subtext: 'Be a part of the solution',
    },
  ];

  // Automatically change slides every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const [isVisible2, setIsVisible2] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible2(true);
          }
        });
      },
      { threshold: 0.3 } // Adjust threshold for when animation triggers
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop to first
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
  
    const loopCarousel = () => {
      const scrollWidth = carousel.scrollWidth;
      const scrollLeft = carousel.scrollLeft;
      const clientWidth = carousel.clientWidth;
  
      if (scrollLeft + clientWidth >= scrollWidth) {
        // Reset to the beginning
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      }
    };
  
    const debounceScroll = () => {
      if (carousel.timeoutId) clearTimeout(carousel.timeoutId);
      carousel.timeoutId = setTimeout(() => {
        loopCarousel();
      }, 200);
    };
  
    // Attach listener
    carousel.addEventListener("scroll", debounceScroll);
  
    // Cleanup
    return () => {
      carousel.removeEventListener("scroll", debounceScroll);
    };
  }, []);

  return (
  <>
    <section id="home" className={`relative flex justify-center items-center h-screen bg-green-100 overflow-hidden transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div data-aos="fade-up" className="relative container px-5 grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
        {/* Text Content */}
        <div
          className="flex flex-col justify-center text-left transform transition-transform duration-700 ease-in-out delay-100"
          key={currentSlide} // Re-render text when slide changes for animation
        >
          <span className="text-lg md:text-xl mb-4 animate-fade-in-down">
            {slides[currentSlide].subtext}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 animate-fade-in-up">
            {slides[currentSlide].heading}
          </h1>
          <div className="flex">
            <a
              href="#"
              className="bg-teal-700 hover:bg-teal-800 text-white py-3 px-6 rounded-full mt-4 transition duration-300"
            >
              Get Involved{' '}
              <ArrowRightIcon className="h-5 w-5 inline-block ml-2" />
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex mt-10 gap-4 transform transition-transform duration-700 ease-in-out delay-100">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-600 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8"
              >
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.337v21.326C0 23.4.6 24 1.337 24H12.81v-9.294H9.692v-3.622h3.118V8.413c0-3.1 1.894-4.788 4.658-4.788 1.325 0 2.465.098 2.798.143v3.243l-1.92.001c-1.505 0-1.796.715-1.796 1.762v2.31h3.587l-.467 3.622h-3.12V24h6.116c.737 0 1.337-.6 1.337-1.337V1.337C24 .6 23.4 0 22.675 0z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-500 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.347 3.608 1.322.976.975 1.26 2.243 1.322 3.608.059 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.347 2.633-1.322 3.608-.975.976-2.243 1.26-3.608 1.322-1.266.059-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.347-3.608-1.322-.976-.975-1.26-2.243-1.322-3.608-.059-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.347-2.633 1.322-3.608.975-.976 2.243-1.26 3.608-1.322 1.266-.059 1.646-.07 4.85-.07M12 0C8.741 0 8.332.012 7.052.07c-1.518.062-2.917.37-4.017 1.47C1.97 2.97 1.661 4.369 1.6 5.886.942 7.166.93 7.575.93 12c0 4.426.012 4.835.07 6.114.062 1.518.37 2.917 1.47 4.017 1.1 1.1 2.5 1.408 4.017 1.47C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.518-.062 2.917-.37 4.017-1.47 1.1-1.1 1.408-2.5 1.47-4.017.058-1.279.07-1.688.07-6.114 0-4.426-.012-4.835-.07-6.114-.062-1.518-.37-2.917-1.47-4.017-1.1-1.1-2.5-1.408-4.017-1.47C15.668.012 15.259 0 12 0z" />
                <circle cx="12" cy="12" r="3.2" />
                <path d="M18.406 4.594c-.796 0-1.44.644-1.44 1.44 0 .796.644 1.44 1.44 1.44.796 0 1.44-.644 1.44-1.44 0-.796-.644-1.44-1.44-1.44z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-8 w-8"
              >
                <path d="M23.953 4.57c-.885.392-1.83.656-2.825.775 1.014-.607 1.794-1.57 2.163-2.723-.95.56-2.005.975-3.127 1.195-.896-.956-2.171-1.55-3.595-1.55-2.718 0-4.923 2.206-4.923 4.923 0 .386.045.761.127 1.124-4.092-.205-7.73-2.165-10.148-5.144-.426.728-.666 1.576-.666 2.486 0 1.716.872 3.22 2.188 4.099-.805-.026-1.564-.247-2.229-.616v.062c0 2.397 1.704 4.4 3.963 4.854-.414.112-.851.171-1.295.171-.317 0-.628-.031-.934-.088.628 1.96 2.444 3.39 4.6 3.43-1.68 1.318-3.805 2.106-6.103 2.106-.396 0-.787-.023-1.172-.069 2.177 1.396 4.764 2.207 7.54 2.207 9.047 0 13.999-7.493 13.999-13.978 0-.213-.005-.425-.014-.637.961-.693 1.796-1.558 2.457-2.549l-.047-.02z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section
      ref={sectionRef}

      className="meetup section relative bg-green-50 px-6 sm:px-8 py-20 sm:py-32 lg:py-40 min-h-screen"
      id="about"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#d1fae5"
            fillOpacity="1"
            d="M0,64L40,96C80,128,160,192,240,192C320,192,400,128,480,96C560,64,640,64,720,96C800,128,880,192,960,208C1040,224,1120,192,1200,160C1280,128,1360,96,1400,80L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="meetup__container container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10 relative">
        {/* Text Section */}
        <div
          data-aos="fade-up"
          className={`meetup__data flex flex-col justify-center transition-all duration-500 ease-in-out ${
            isVisible2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <h3 className="text-teal-600 font-semibold text-lg mb-2 uppercase">
            Get Involved
          </h3>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            Participate in <br /> Planting Meet-Ups!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Join us in organizing and participating in community planting events.
            Help us make Karachi greener, one tree at a time.
          </p>
          <a
            href="#"
            className=" w-60 flex bg-gradient-to-r from-teal-700 to-green-600 text-white py-3 px-6 rounded-full shadow-md transition duration-500 hover:from-teal-800 hover:to-green-700"
          >
            Become a Volunteer
          </a>
        </div>

        {/* Images Section */}
        <div
          className={`meetup__img flex items-center justify-center gap-6 transition-all duration-500 ease-in-out ${
            isVisible2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="meetup__img-overlay relative">
            
            <img
              src="/assets/images/volunteers1.jpg"
              alt="Volunteers"
              className="meetup__img-one h-64 lg:h-72 w-48 lg:w-52 object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-105 shadow-lg"
            />
          </div>
          <div className="meetup__img-overlay relative">
            
            <img
              src="/assets/images/volunteers2.jpg"
              alt="Volunteers"
              className="meetup__img-two h-80 lg:h-96 w-60 lg:w-64 object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-105 shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <section 
    className="bg-green-50 py-16 px-4" id="discover">
      {/* Section Title */}
      <h2 data-aos="fade-up" className="text-center text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
        Make A Difference <br className="hidden sm:block" /> with Your Donation
      </h2>

      {/* Donate Button */}
      <div data-aos="fade-up" className="text-center mb-12">
        <a
          href='/donation'
          className="bg-green-600 text-white py-3 px-8 rounded-lg shadow-lg transition-all hover:bg-green-700 hover:shadow-xl"
        >
          Donate Now
        </a>
      </div>

      {/* Carousel Container */}
      <div className="flex justify-center">
        <div
          data-aos="fade-up"
          className="carousel carousel-loop flex gap-6 rounded-lg max-w-4xl w-full relative overflow-x-auto h-80"
          ref={carouselRef}
        >
          {/* Carousel Items */}
          {[
            {
              imgSrc: "/assets/images/project.jpg",
              title: "Planting Projects",
              description: "Help us expand green spaces by contributing to our tree planting projects.",
            },
            {
              imgSrc: "/assets/images/payment1.jpg",
              title: "Payment Options",
              description: "Seamless donations via Easypaisa, JazzCash, Stripe, and more.",
            },
            {
              imgSrc: "/assets/images/children1.jpg",
              title: "Education Initiatives",
              description: "Support environmental education programs for the next generation.",
            },
            {
              imgSrc: "/assets/images/donate1.jpg",
              title: "Donation Tiers",
              description: "Flexible donation plans tailored for all supporters.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="carousel-item min-w-[18rem] sm:min-w-[16rem] h-full relative flex-shrink-0 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all duration-300"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-2">
          <span className="h-2 w-2 bg-green-600 rounded-full"></span>
          <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
          <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
          <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>
    </section>

    <section className="bg-green-50 mb:8 py-20 px-4 lg:px-24 text-center relative overflow-hidden">
      {/* Section Heading */}
      <div data-aos="fade-up" className="mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-semibold mb-4">
          Join Hands To Make The Planet Greener
        </h2>
      </div>

      {/* Stats Section */}
      <div data-aos="fade-up" className="flex flex-col md:flex-row justify-center items-center mb-12">
        <div className="text-center mx-4 mb-6 md:mb-0">
          <p className="text-3xl md:text-4xl text-gray-700 font-bold">1%</p>
          <p className="text-md md:text-lg text-gray-600">Tree Cover in Karachi</p>
        </div>
        <div className="text-center mx-4 mb-6 md:mb-0">
          <p className="text-3xl md:text-4xl text-gray-700 font-bold">40°C+</p>
          <p className="text-md md:text-lg text-gray-600">Heatwave Temperature</p>
        </div>
        <div className="text-center mx-4">
          <p className="text-3xl md:text-4xl text-gray-700 font-bold">10,000+</p>
          <p className="text-md md:text-lg text-gray-600">Volunteers Active in Karachi</p>
        </div>
      </div>

      {/* Images Section */}
      <div data-aos="fade-up" className="relative flex justify-center items-center">
        {/* Larger Image */}
        <div className="relative w-3/4 md:w-1/2 lg:w-1/3 max-w-md transition-all duration-500 transform hover:scale-105">
          <img
            src="/assets/images/about1-min.jpg"
            alt="Hands together"
            className="w-full h-64 object-cover rounded-lg shadow-lg brightness-90"
            loading="lazy"
          />
        </div>

        {/* Smaller Image */}
        <div className="absolute top-1/3 left-2/3 lg:top-1/4 lg:left-2/3 w-36 sm:w-40 h-60 sm:h-72 transition-all duration-500 transform hover:scale-105 hover:rotate-2 shadow-lg">
          <img
            src="/assets/images/about2-min.jpg"
            alt="People gardening"
            className="w-full h-full object-cover rounded-lg brightness-90"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <section className="bg-green-50">
      {/* Section Header */}
      <div data-aos="fade-up" className="px-6 py-12">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Our Extraordinary Blog
        </h2>
        <p className="text-lg lg:text-xl text-gray-600 mb-2 text-center">
          Building a Supportive Community and Accessing Resources for Success
        </p>
      </div>

      {/* Blog Grid */}
      <div className="flex justify-center">
        <div data-aos="fade-up" className="grid gap-10 w-full max-w-7xl px-6 lg:px-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg overflow-hidden"
            >
              {/* Blog Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />

              {/* Blog Content */}
              <div className="p-6">
                <h3 className="text-lg lg:text-xl text-black font-semibold mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{blog.date}</p>
                <p className="text-gray-700 text-sm lg:text-base mb-4">
                  {blog.description}
                </p>
                <a
                href={blog.link}
                target='_blank'
                className="text-indigo-600 hover:text-indigo-900 font-bold">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  );
};

export default Home;