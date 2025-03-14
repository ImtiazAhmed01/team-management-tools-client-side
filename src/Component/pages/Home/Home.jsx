import React from "react";
import Hero from "./Hero";
import OurServices from "./OurServices";
import HowItWorks from "./HowItWorks";
import Testimonial from "./Testimonial";
import FAQ from "./FAQ";

const Home = () => {
  return (
    <div className="dark:bg-gray-900">
      <Hero />
      <OurServices />
      <HowItWorks/>
      <Testimonial/>
      <FAQ/>
    </div>
  );
};

export default Home;
