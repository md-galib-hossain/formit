import React from "react";

const HowItWorks = () => {
  return (
    <section className="bg-white py-12 my-20">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">How It Works</h2>
        <p className="text-center text-lg text-gray-700 mb-12">
          Creating forms is easy with Formit AI. Follow these simple steps to get started:
        </p>
        <div className="flex flex-col md:flex-row md:justify-around md:gap-8">
          {/* Step 1 */}
          <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-lg mb-6 md:mb-0">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Step 1</h3>
            <p className="text-gray-700">
              Input your desired form requirements into the prompt. Be specific to get the best results.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-lg mb-6 md:mb-0">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Step 2</h3>
            <p className="text-gray-700">
              Our AI generates the form based on your specifications. Review the form for accuracy and completeness.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Step 3</h3>
            <p className="text-gray-700">
              Customize the form and copy the live link share with others And enjoy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
