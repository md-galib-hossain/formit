"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Hero from "./_components/Hero";
import { useUser } from "@clerk/nextjs";
const page = () => {
 
  return (
    <div>
      <Hero />
    </div>
  );
};

export default page;
