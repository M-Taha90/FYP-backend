import AnimateSlideText from "../components/Animate_Slide_Text"

const About_Header = () => {
  return (
    <div className ="bg-center bg-cover bg-about-header flex items-center justify-center flex-row mb-12 w-screen h-[80vh]">
      <h1 className = "sm:text-9xl text-center text-6xl text-white font-bold font-nunito animate-slide-bottom  mr-[10px]">
        <AnimateSlideText text = "Meet Sairaab"></AnimateSlideText>
        </h1>
    </div>
  )
}

export default About_Header

