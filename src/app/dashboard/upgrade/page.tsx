"use client";
import PricingPlan from "@/app/_data/PricingPlan";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { useContextUser } from "@/lib/UserContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY!);

const Upgrade = () => {
  const user = useContextUser()
  console.log(user)
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const handleStripe = async (priceId: string) => {
    setLoading((prev) => ({ ...prev, [priceId]: true }));
    try {
      const { data } = await axios.post("/api/checkout", { priceId });
      console.log(data);
      if (data.sessionId) {
        const stripe = await stripePromise;
        const response = await stripe?.redirectToCheckout({ sessionId: data.sessionId });
        console.log(response);
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
    <div className="mx-auto max-w-4xl p-14 sm:px-6 sm:py-12 lg:px-8 flex justify-center">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 ">
        {PricingPlan.map((item) => (
          <div
            key={item.priceId}
            className="rounded-2xl flex flex-col h-full justify-between border border-gray-200 p-6 shadow-sm bg-white"
          >
            <div>
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900 sm:text-xl">
                  {item.duration} Plan
                </h2>
                <p className="mt-2 sm:mt-4">
                  <strong className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    ${item.price}
                  </strong>
                  <span className="text-sm font-medium text-gray-700">/{item.duration.toLowerCase()}</span>
                </p>
              </div>
              <ul className="mt-6 space-y-2">
                {item.features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-1 ${feature.available ? 'text-gray-700' : 'text-gray-400'}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-5 h-5 ${feature.available ? 'text-primary' : 'text-gray-400'}`}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              disabled={user?.subscriptionType === item.duration || user?.subscriptionType === "Yearly"||loading[item.priceId]}
              onClick={() => handleStripe(item.priceId)}
              className={`mt-8 rounded-full border w-full text-center text-sm font-medium text-white ${
                loading[item.priceId]
                  ? "bg-gray-400 cursor-not-allowed"
                  : "border-primary bg-white text-primary hover:ring-1 hover:ring-primary hover:text-white"
              }`}
            >
            {
  loading[item.priceId]
    ? "Proceeding..."
    : user?.subscriptionType === "Monthly" && item.duration === "Monthly"
    ? "Already Subscribed"
    : user?.subscriptionType === "Monthly" && item.duration === "Yearly"
    ? "Upgrade"
     : user?.subscriptionType === "Yearly" && item.duration === "Monthly"
    ? "Already Subscribed"
    : user?.subscriptionType === item.duration
    ? "Already Subscribed"
    : "Get Started"
}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
