import AnimateSlideText from "./Animate_Slide_Text";

const Donate_CTA = () => {
  return (
    <div className="w-full flex justify-center my-6 bg-donate-cta p-4 py-8 mt-12">
      <div className="bg-center text-gray-200 flex flex-col md:flex-row items-center w-[90%] md:w-[80%] text-xl md:text-2xl">
        <div className="w-full md:w-[80%] flex justify-center md:justify-left font-bold text-2xl md:text-3xl mb-4 md:mb-0 text-center md:text-left animate-slide-bottom">
          <h3>
            <AnimateSlideText text = "HELP MAKE AN IMPACT FOR A GREENER PAKISTAN"/>
          </h3>
        </div>
        <div className="w-full md:w-[20%] flex justify-center md:justify-end animate-slide-bottom">
          <button
            type="button"
            className="px-8 md:px-12 py-3 border-4 border-gray-200 rounded-lg font-semibold hover:bg-gray-50 hover:text-green-500 hover:border-green-500 ease-in-out duration-[0.6s]"
          >
            <AnimateSlideText text = "DONATE"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donate_CTA;
