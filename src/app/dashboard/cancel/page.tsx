"use client";
import React from "react";
import Image from "next/image";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import cancelImg from "@/assets/cancel.svg";

const CancelPage = () => {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <div className="p-8 text-center max-w-lg w-full">
        <Image
          src={cancelImg}
          alt="Cancellation"
          width={250}
          height={250}
          className="mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Subscription Cancelled
        </h2>
        <p className="text-gray-600 mb-4">
          We're sorry to see you go. If you change your mind, you can always subscribe again.
        </p>
        
        <button
          onClick={handleBackToDashboard}
          className="mt-8 bg-primary text-white py-3 px-6 rounded-full shadow hover:bg-customHover transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CancelPage;
