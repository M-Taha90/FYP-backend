import React from "react"
import { About_Motive, Counter_Rising, Donate_CTA, Quote, About_Process  } from "./about/components"
import { About_Header, About_Carousel } from './about/containers'
import './about.css'

const About = () => {
  return (
    <div className = "About_Page">
      <About_Header />
      <About_Motive />
      <Donate_CTA />
      <Counter_Rising />
      <About_Process />
      <Quote />
      <About_Carousel />
    </div>  
  )
}

export default About 