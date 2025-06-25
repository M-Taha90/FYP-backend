import AnimateSlideText from "./Animate_Slide_Text"

const About_Motive = () => {
  return (
    <div className="w-full flex justify-center items-center font-oswald text-serpentine">
      <div className="h-auto md:h-[750px] justify-center align-center w-[90%] md:w-[80%] grid mx-4 md:mx-[30px] px-6 md:px-10 grid-cols-1 md:grid-cols-2 grid-rows-auto border-t border-b py-8 border-ivy gap-6 md:gap-8">
        
        <div className="w-full max-h-full flex justify-center items-center text-center order-1">
          <div>
            <h3 className="mb-3 text-3xl md:text-4xl">
              <AnimateSlideText text= "Our Identity"/></h3>
            <p className="text-base md:text-xl text-ivy">
              <AnimateSlideText text="Sairaab is a movement ignited by a group of dedicated environmental enthusiasts who are passionate about revitalizing their homeland, Pakistan. Our mission is to foster a greener, healthier Pakistan through community-driven initiatives and sustainable practices." />
            </p>
          </div>
        </div>

        <div className="w-full h-[250px] md:h-auto flex justify-center items-center text-center bg-cover bg-center bg-about-motive1 order-2"></div>

        <div className="w-full max-h-full flex justify-center items-center text-center order-3 md:order-4">
          <div>
            <h3 className="mb-3 text-3xl md:text-4xl">
              <AnimateSlideText text = "Our Vision"/>
            </h3>
            <p className="text-base md:text-xl text-ivy">
              <AnimateSlideText text="
              Pakistan, with less than 5% forest cover, faces severe heatwaves due to climate change. Sairaab aims to increase forest cover to 10% by 2028 to combat these challenges. We&quot;ll achieve this through community-driven tree planting and sustainable practices."/>
            </p>
          </div>
        </div>

        <div className="w-full h-[250px] md:h-auto flex justify-center items-center text-center bg-cover bg-center bg-about-motive2 order-4 md:order-3"></div>
      </div>
    </div>
  );
};

export default About_Motive;
