const HeroSection = () => {
  return (
    <main className="flex flex-col lg:flex-row items-start mt-10 md:mt-16">
        <section className="flex-1 flex flex-col justify-center items-center w-full text-center lg:block lg:text-left">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mt-10 md:mt-20">
            Manage your <br /> <span className="text-green-400">money</span> in the best <br />
            possible <span className="text-green-400">way</span>.
          </h1>
          <p className="text-gray-400 mt-4 md:mt-6 max-w-lg">
            Expense Flow is the app that manages your finance with its ever smart features.
          </p>

          <div className="mt-6 md:mt-8 flex md:flex-col md:space-y-4 md:max-w-56">
            <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 mr-4 md:mr-0 rounded-full hover:opacity-80">
              Get Started
            </button>
            <button className="text-white px-6 py-3 border border-white rounded-full hover:bg-gray-700">
              Watch Video
            </button>
          </div>
        </section>

        <div className="flex-1 justify-center align-center mt-10 md:mt-24 relative w-full lg:w-auto">
          <img
            src="/Images/Iphone.png"
            alt="Mobile app preview"
            className="w-1/4 top-36 sm:w-1/4 sm:top-40 md:w-3/12 md:top-32 lg:w-1/3 lg:top-12 absolute -right-10 z-10 -rotate-6"
          />
          <img
            src="/Images/macbook.png"
            alt="Mobile app preview"
            className="w-full sm:4/12 md:w-11/12 mx-auto"
          />
        </div>
    </main>
  )
}

export default HeroSection