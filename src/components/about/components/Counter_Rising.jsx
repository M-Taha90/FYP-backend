import RisingNumbers from "./Rising_Numbers";

const Counter_Rising = () => {
  return (
    <div className="flex justify-center relative">

      <div className="relative w-[80vw] flex space-x-4 justify-center items-center text-green-700 py-4 my-8">
        
        <div className="w-[30%] font-nunito">
          <div className="relative sm:h-[300px] h-[150px] flex items-center justify-center rounded-xl">
            <div className="absolute inset-0 bg-green-600 rounded-xl"></div>
            <div className="relative bg-about-count-trees w-[80%] aspect-square bg-contain bg-center z-10 rounded-xl"></div>
          </div>
          <div className="w-[100%] text-center flex items-center justify-center mt-4 text-3xl sm:text-5xl">
            <RisingNumbers end={1000} duration={2} />
          </div>
          <div className="flex justify-center text-center text-lg my-1 sm:text-xl">
            Trees <br></br>Planted
          </div>
        </div>



        <div className="w-[30%] font-nunito">
          <div className="relative sm:h-[300px] h-[150px] flex items-center justify-center rounded-xl">
            <div className="absolute inset-0 bg-green-500 rounded-xl"></div>
            <div className="relative bg-about-count-volunteers w-[80%] aspect-square bg-contain bg-center z-10 rounded-xl"></div>
          </div>
          <div className="w-[100%] text-center flex items-center justify-center mt-4 text-3xl sm:text-5xl">
            <RisingNumbers end={2000} duration={2} />
          </div>
          <div className="flex justify-center text-lg my-1 text-center sm:text-xl">
            Volunteers <br></br>Participating
          </div>
        </div>



        <div className="w-[30%] font-nunito">
          <div className="relative sm:h-[300px] h-[150px] flex items-center justify-center rounded-xl">
            <div className="absolute inset-0 bg-green-400 rounded-xl"></div>
            <div className="relative bg-about-count-projects w-[80%] aspect-square bg-contain bg-center z-10 rounded-xl"></div>
          </div>
          <div className="w-[100%] text-center flex items-center justify-center mt-4 text-3xl sm:text-5xl">
            <RisingNumbers end={3000} duration={2} />
          </div>
          <div className="flex justify-center text-lg my-1 text-center sm:text-xl">
            Successful <br></br> Projects
          </div>
        </div>

      </div>
    </div>
  );
};

export default Counter_Rising;
