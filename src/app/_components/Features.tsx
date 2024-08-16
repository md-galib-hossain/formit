import React from "react";
import { CheckCircle, Edit3, Lock } from "lucide-react";

const featureData = [
  {
    id: 1,
    icon: <CheckCircle />,
    title: "Quick Form Creation",
    description: "Create forms in seconds using AI-powered prompts.",
  },
  {
    id: 2,
    icon: <Edit3 />,
    title: "Customizable UI",
    description: "Full control over form appearance and layout.",
  },
  {
    id: 3,
    icon: <Lock />,
    title: "Secure Data Storage",
    description: "Store all form responses safely in our database.",
  },
  // Add more features as needed
];

const Features = () => {
  return (
    <section className="bg-primary py-16 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-secondary">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureData.map(({ id, icon, title, description }) => (
            <div
              key={id}
              className="feature-card bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <div className="mb-4 text-primary">
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
