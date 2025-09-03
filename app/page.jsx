"use client";
import HeroSection from "../components/hero-section"
import Features from "../components/features-1"
import IntegrationsSection from "../components/integrations-3"
import ContentSection from "../components/content-1"
import WallOfLoveSection from "../components/testimonials"
import Pricing from "../components/pricing"
import FooterSection from "../components/footer"
import FAQsThree from "../components/faqs-3"


export default function Home() {
  

  return (
    <div className="">
     
      
          <HeroSection/>
          <ContentSection/>
          <IntegrationsSection/>
          <Features/>
          <Pricing/>
          <WallOfLoveSection/>
          <FAQsThree/>
          <FooterSection/>



          
    
    </div>
  );
}
