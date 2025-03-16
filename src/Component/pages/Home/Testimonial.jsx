import React from "react";

const Testimonial = () => {
  return (
    <section className="bg-white dark:bg-gray-900 w-11/12 mx-auto dark:mt-8">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
          What clients are saying
        </h1>

        <div className="flex justify-center mx-auto mt-6">
          <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>

        <div className="carousel w-full -mt-5">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex items-start max-w-6xl mx-auto mt-16">
              <div>
                <p className="flex items-center text-center text-gray-500 lg:px-52">
                Working with this team has been an absolute pleasure. They helped me bring my vision to life, and the results speak for themselves. Their attention to detail and communication throughout the entire process was impeccable. I highly recommend their services to anyone looking to elevate their brand!
                </p>

                <div className="flex flex-col items-center justify-center mt-8">
                  <img
                    className="object-cover rounded-full w-20 h-20"
                    src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="Client"
                  />

                  <div className="mt-2 text-center">
                    <h1 className="font-bold text-gray-800 dark:text-white">
                      Mia Brown
                    </h1>
                    <span className="text-sm text-blue-500 dark:text-gray-400">
                      Marketer
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute md:left-5 md:right-5 -left-3 right-0 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex items-start max-w-6xl mx-auto mt-16">
              <div>
                <p className="flex items-center text-center text-gray-500 lg:px-52">
                I couldn't be happier with the experience I had working with this team. They were incredibly collaborative, and they understood exactly what I was looking for. The final design exceeded my expectations, and I've received numerous compliments on it. If you're looking for professional and creative design work, this is the place to go.
                </p>

                <div className="flex flex-col items-center justify-center mt-8">
                  <img
                    className="object-cover rounded-full w-20 h-20"
                    src="https://instaheadshots.com/blog/content/images/2024/10/3.jpeg"
                    alt="Client"
                  />

                  <div className="mt-2 text-center">
                    <h1 className="font-bold text-gray-800 dark:text-white">
                    John Doe
                    </h1>
                    <span className="text-sm text-blue-500 dark:text-gray-400">
                    Designer
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute md:left-5 md:right-5 -left-3 right-0 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex items-start max-w-6xl mx-auto mt-16">
              <div>
                <p className="flex items-center text-center text-gray-500 lg:px-52">
                The team was fantastic to work with. They delivered top-quality code on time and were always open to feedback. They solved complex problems efficiently and were great at explaining technical aspects in an easy-to-understand way. I truly enjoyed collaborating with them and look forward to working together again in the future!
                </p>

                <div className="flex flex-col items-center justify-center mt-8">
                  <img
                    className="object-cover rounded-full w-20 h-20"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5XjT3g7oGhqBqL6XMdd1fEG3RRTnMf2qc2Q&s"
                    alt="Client"
                  />

                  <div className="mt-2 text-center">
                    <h1 className="font-bold text-gray-800 dark:text-white">
                    Alice Smith
                    </h1>
                    <span className="text-sm text-blue-500 dark:text-gray-400">
                    Developer
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute md:left-5 md:right-5 -left-3 right-0 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex items-start max-w-6xl mx-auto mt-16">
              <div>
                <p className="flex items-center text-center text-gray-500 lg:px-52">
                I reached out to this team to help me build my startup’s website, and they did an outstanding job. From the initial consultation to the final launch, they were incredibly responsive and truly cared about understanding my business needs. The website they built is sleek, functional, and user-friendly, and it has already helped me attract new clients. I couldn't be more grateful for their expertise.
                </p>

                <div className="flex flex-col items-center justify-center mt-8">
                  <img
                    className="object-cover rounded-full w-20 h-20"
                    src="https://techcloudltd.com/wp-content/uploads/2024/06/Hairstyles-and-hair-care-tips-for-male-headshots-1024x601.webp"
                    alt="Client"
                  />

                  <div className="mt-2 text-center">
                    <h1 className="font-bold text-gray-800 dark:text-white">
                    James Clark
                    </h1>
                    <span className="text-sm text-blue-500 dark:text-gray-400">
                    Entrepreneur
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute md:left-5 md:right-5 -left-3 right-0 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
