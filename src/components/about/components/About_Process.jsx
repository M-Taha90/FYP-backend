// import { ImArrowRight } from "react-icons/im";

const About_Process = () => {
  return (
    <>
    <h1 className="font-nunito text-5xl font-extrabold text-center mt-8 text-white">
        Sairaab&#39;s Process Flow
      </h1>
    <div className="relative"> {/* Add relative positioning to the container */}
      

      {/* Background divs */}
      <div className="absolute top-0 left-0 w-full h-[50%] bg-khaki z-0 opacity-80"></div>
      <div className="absolute bottom-0 left-0 w-full h-[50%] bg-ivy z-0 opacity-80"></div>

      <div className="my-10 relative z-10"> {/* Relative positioning to bring content above backgrounds */}
        <div className="animate-slide-bottom sm:max-h-[80%] max-h-[800px] m- w-[100vw] sm:justify-center sm:items-center flex flex-col sm:flex-row justify-center items-center">
          
          {/* First Block */}
          <div className="h-[80vh] sm:w-[30%] w-[60%] sm:my-4 my-3">
            <div className="w-full h-[85%] bg-cover bg-center bg-about-process2"></div>
            <div className="w-full h-[15%] text-center flex items-center bg-orange-500 justify-center border-4 border-serpentine">
              <p className="font-nunito text-2xl">Volunteer Planting</p>
            </div>
          </div>

          {/* Second  Block */}
          <div className="h-[80vh] sm:w-[30%] w-[60%] sm:my-4 my-3">
            <div className="w-full h-[85%] bg-cover bg-center bg-about-process3"></div>
            <div className="w-full h-[15%] text-center flex items-center bg-orange-600 justify-center border-4 border-serpentine">
              <p className="font-nunito text-2xl">Intermittent Monitoring</p>
              {/* <ImArrowRight className="text-5xl text-spring absolute top-[10%] left-[-4%] z-10 sm:hidden" /> */}
            </div>
          </div>

          {/* Third Block */}
          <div className="h-[80vh] sm:w-[30%] w-[60%] sm:my-4 my-3">
            <div className="w-full h-[85%] bg-cover bg-center bg-about-process1"></div>
            <div className="w-full h-[15%] text-center flex items-center bg-orange-700 justify-center border-4 border-serpentine">
              <p className="font-nunito text-2xl">Discovering Locations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About_Process;
