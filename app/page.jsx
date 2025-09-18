"use client";
import HeroSection from "../components/hero-section"
import Features from "../components/features-1"
import IntegrationsSection from "../components/integrations-3"
import ContentSection from "../components/content-1"
import WallOfLoveSection from "../components/testimonials"
import Pricing from "../components/pricing"
import FooterSection from "../components/footer"
import FAQsThree from "../components/faqs-3"
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  

  return (
    <div className="">
     
      
      
          <HeroSection/>
          <ContentSection/>
          
          <Features/>
          <Pricing/>
          <WallOfLoveSection/>
          <FAQsThree/>
          <FooterSection/>



          
    
    </div>
  );
}
