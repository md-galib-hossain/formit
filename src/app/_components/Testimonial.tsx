import React from "react";
import user1 from "@/assets/user1.jpg"
import user2 from "@/assets/user2.jpg"
import user3 from "@/assets/user3.jpg"
import Image from "next/image";
const testimonials = [
  {
    name: "Paul Starr",
    image: user1,
    rating: 5,
    content: "Formit AI transformed the way we handle form creation. The intuitive interface and powerful AI-driven features have made building complex forms a breeze. Highly recommended for any organization looking to streamline their form-building process!",
    email: "paul.starr@example.com",
    userId: "user123",
    reviewId: "review456"
  },
  {
    name: "Jack Moy",
    image: user2,
    rating: 4,
    content: "Using Formit AI has significantly cut down our form development time. The AI suggestions are incredibly accurate, and the customization options are extensive. It's a fantastic tool for both simple and complex forms.",
    email: "anna.miller@example.com",
    userId: "user789",
    reviewId: "review101"
  },
  {
    name: "Mark Johnson",
    image: user3,
    rating: 3,
    content: "Formit AI is a useful tool, but it has a bit of a learning curve. Once you get the hang of it, though, it’s very effective for creating and managing forms. The AI can sometimes miss nuances, but overall, it's a solid solution.",
    email: "mark.johnson@example.com",
    userId: "user456",
    reviewId: "review202"
  }
];


const Testimonials = () => {
  return (
    <section className="bg-primary my-20">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-center text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
          Read trusted reviews from our customers
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          {testimonials?.map((testimonial, index) => (
            <blockquote key={index} className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <Image
                  alt={`Photo of ${testimonial.name}`}
                  src={testimonial.image}
                  className="size-14 rounded-full object-cover"
                />

                <div>
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    ))}
                  </div>

                  <p className="mt-0.5 text-lg font-medium text-gray-900">{testimonial.name}</p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">{testimonial.content}</p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
