"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Hero from "./_components/Hero";
import { useUser } from "@clerk/nextjs";
import HowItWorks from "./_components/HowItWorks";
import Features from "./_components/Features";
import ControlSection from "./_components/ControlSection";
import Testimonials from "./_components/Testimonial";
import Pricing from "./_components/Pricing";
import Footer from "./_components/Footer";
const page = () => {
 
  return (
    <div>
    <Hero />
      <Features />
      <HowItWorks />
      <ControlSection />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
};

export default page;
