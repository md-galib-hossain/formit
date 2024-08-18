import Image from "next/image";
import robotlogo from "@/assets/robot.png";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:py-24 md:py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center flex flex-col justify-center items-center">
          <div className="w-48 sm:w-64 lg:w-72">
            <Image src={robotlogo} alt="logo" layout="responsive" />
          </div>
          <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 font-poppins leading-tight">
            Effortless Form Creation <br className="hidden sm:inline" /> Save Time, Build More.
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-700 font-inter max-w-prose">
            Formit AI is a form builder that simplifies tasks and workflows. It offers customization, automates data processing, and enhances efficiency for all users!
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link
              className="block w-full sm:w-auto rounded-full bg-primary px-8 py-3 sm:px-12 sm:py-4 text-sm sm:text-base lg:text-lg font-medium text-white shadow-lg transition duration-300 ease-in-out hover:bg-customHover focus:outline-none focus:ring active:bg-primary"
              href="/dashboard"
            >
              Start Creating
            </Link>

            <a
              className="block w-full sm:w-auto rounded-full border border-primary px-8 py-3 sm:px-12 sm:py-4 text-sm sm:text-base lg:text-lg font-medium text-primary shadow-lg transition duration-300 ease-in-out hover:bg-green-50 focus:outline-none focus:ring active:bg-blue-100"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
