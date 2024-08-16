import Link from "next/link";
import React from "react";
import pricingOptions from "@/app/_data/PricingPlan";
import { useUser } from "@clerk/nextjs";

const Pricing = () => {
  const user = useUser();
  console.log(user);
  return (
    <section className="py-12 sm:py-16 lg:py-20 my-20">
      <h2 className="text-center text-4xl font-bold tracking-tight mb-8 text-gray-900 sm:text-5xl">
        Choose Your Plan
      </h2>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className={`rounded-2xl border border-gray-200 p-6 shadow-lg sm:px-8 lg:p-12`}
            >
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">
                  {option.duration === "Monthly" ? "Basic" : "Pro"}
                </h2>
                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    ${option.price}
                  </strong>
                  <span className="text-sm font-medium text-gray-700">
                    /{option.duration}
                  </span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                {option.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={`flex items-center gap-2 ${
                      feature.available ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`h-6 w-6 ${
                        feature.available ? "text-primary" : "text-gray-400"
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={user?.isSignedIn ? "/dashboard/upgrade" : "/sign-in"}
            className="inline-block rounded-full border border-primary bg-primary px-12 py-3 text-center text-sm font-medium text-white hover:bg-customHover focus:outline-none focus:ring active:bg-customHover"
          >
            Upgrade Plan
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
