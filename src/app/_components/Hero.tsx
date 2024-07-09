
const Hero = () => {
  return (
    <section className="bg-gray-50">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen ">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          Create your form
          <strong className="font-extrabold text-primary sm:block"> In seconds not hours </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
          numquam ea!
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-customHover focus:outline-none focus:ring active:bg-customHover sm:w-auto"
            href="#"
          >
           + Create form
          </a>
  
          <a
            className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-customHover focus:outline-none focus:ring active:text-customHover sm:w-auto"
            href="#"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Hero