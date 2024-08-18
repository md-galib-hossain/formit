const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-6xl">
          Effortless Form Creation Save Time, Build More.
          </h1>

          <p className="mt-4 text-lg text-gray-700 sm:text-xl">
            Formit AI is a form builder that simplifies tasks and workflows. It
            offers customization, automates data processing, and enhances
            efficiency for all users!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-customHover focus:outline-none focus:ring active:bg-primary sm:w-auto"
              href="#"
            >
              + Create form
            </a>

            <a
              className="block w-full rounded border border-primary px-12 py-3 text-sm font-medium text-primary shadow hover:bg-green-50 focus:outline-none focus:ring active:bg-blue-100 sm:w-auto"
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
