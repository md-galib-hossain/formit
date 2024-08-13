"use client";
import PricingPlan from "@/app/_data/PricingPlan";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!);

const Upgrade = () => {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const handleStripe = async (priceId: string) => {
    setLoading((prev) => ({ ...prev, [priceId]: true }));
    try {
      const { data } = await axios.post("/api/checkout", {
        priceId,
      });
      console.log(data)
      if (data.sessionId) {
        const stripe = await stripePromise;
        const response = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        });
        return response;
      } else {
        toast.error("Failed to create checkout session");
      }
    } catch (err: any) {
      console.log(err);
      toast.error("Error during checkout");
    } finally {
      setLoading((prev) => ({ ...prev, [priceId]: false }));
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex justify-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
        {PricingPlan.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12"
          >
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                {item.duration}
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {item.price}$
                </strong>

                <span className="text-sm font-medium text-gray-700">
                  /{item.duration.toLowerCase()}
                </span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">10 users included</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">2GB of storage</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">Email support</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700">Help center access</span>
              </li>
            </ul>
            <Button
              disabled={loading[item.priceId]}
              onClick={() => handleStripe(item.priceId)}
              className={`mt-8 rounded-full border w-full text-center text-sm font-medium text-white active:text-white hover:text-white ${
                loading[item.priceId]
                  ? "bg-gray-400 cursor-not-allowed"
                  : "border-primary bg-white text-primary hover:ring-1 hover:ring-primary focus:outline-none focus:ring active:text-white hover:text-white"
              }`}
            >
              {loading[item.priceId] ? "Proceeding..." : "Get Started"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
