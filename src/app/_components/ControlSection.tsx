import Image from "next/image";
import React from "react";
import control from "@/assets/control.svg";

const ControlSection = () => {
  return (
    <section className="py-12 my-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12 space-y-8 md:space-y-0 md:space-x-8">
        {/* Image on the left */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <Image src={control} alt="Control Panel" width={500} height={300} layout="responsive" className="rounded-lg" />
        </div>

        {/* Text on the right */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Control Your Form</h2>
          <p className="text-lg text-gray-700 mb-6">
            Seamlessly customize every aspect of your form with our intuitive controls. Here's how you can enhance your forms:
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Customizable Fields: Adjust and style fields to match your branding.</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Advanced Validation: Implement sophisticated validation rules effortlessly.</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Responsive Layouts: Ensure your forms look great on all devices.</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-primary"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Real-time Previews: See changes instantly with real-time preview.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ControlSection;
