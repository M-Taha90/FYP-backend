import AnimateSlideText from "./Animate_Slide_Text";

const Quote = () => {
  return (
    <div className="flex justify-center items-center w-full font-oswald">
      <div className="w-4/5 border-t border-b border-ivy py-6 flex justify-center">

        <div className="w-[80%]">
          <div>
            <h3 className="text-3xl font-medium text-white mb-1 w-full">
                <AnimateSlideText text = "&quot;Pakistan&#39;s cities are crying out for greenery. Together, we can transform our urban landscapes and create a more sustainable environment&quot;"/>
              
            </h3>
          </div>
          <div className="flex justify-end w-90 text-ivy text-lg font-extralight">
            <p>
              <AnimateSlideText text = "- Shahzaib Zulfiqar, Founder Sairaab"/>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Quote;