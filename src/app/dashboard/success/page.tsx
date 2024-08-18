"use client";
import React from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import successImg from "@/assets/success.svg"
const SuccessPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { userId, session_id } = searchParams;
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <div className="p-8 text-center max-w-lg w-full">
        <Image
          src={successImg}
          alt="Success"
          width={250}
          height={250}
          className="mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Subscription Successful!
        </h2>
        <p className="text-gray-600 mb-4">
          Thank you for subscribing! Your support means a lot to us.
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

export default SuccessPage;
