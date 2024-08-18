import Image from "next/image";
import robotlogo from "@/assets/robot.png";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 flex flex-col items-center text-center">
        <div className="mb-8">
          <div className="w-32 sm:w-48 md:w-64">
            <Image src={robotlogo} alt="logo" layout="responsive" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Effortless Form Creation
          <br className="hidden sm:inline" /> Save Time, Build More.
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Formit AI is a form builder that simplifies tasks and workflows. It offers customization, automates data processing, and enhances efficiency for all users!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            className="block w-full sm:w-60 rounded-full bg-primary px-6 py-3 text-base font-medium text-white shadow-lg transition duration-300 ease-in-out hover:bg-customHover focus:outline-none focus:ring active:bg-primary"
            href="/dashboard"
          >
            Start Creating
          </Link>

          <a
            className="block w-full sm:w-60 rounded-full border border-primary px-6 py-3 text-base font-medium text-primary shadow-lg transition duration-300 ease-in-out hover:bg-green-50 focus:outline-none focus:ring active:bg-blue-100"
            href="#"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
