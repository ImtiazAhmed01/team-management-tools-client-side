import { MdOutlineEditNote } from "react-icons/md";

const Hero = () => {
  return (
    <header>
      <div
        className="w-full bg-center bg-cover h-[30rem]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')",
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900/50">
          <div className="text-center space-y-3 lg:-mt-5">
            <h1 className="lg:text-5xl font-extrabold text-center md:text-4xl text-3xl 2xl:text-8xl">
              <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-300 via-indigo-300 to-sky-300 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-300">
                Collaboration
              </span>

              <span className="ml-3 text-transparent bg-gradient-to-tr bg-clip-text from-blue-300 via-pink-300 to-red-300 dark:from-sky-300 dark:via-pink-300 dark:to-red-300">
                Made Effortless
              </span>
            </h1>
            <p className="text-white font-semibold text-lg lg:px-64 md:px-12 px-5">
              Simplify teamwork with an intuitive platform that brings everyone
              together in real-time. Seamlessly manage tasks, chat, and share
              resources.
            </p>
            <button className="px-5 py-2 mt-4 text-lg font-medium text-white capitalize transition-colors transform bg-gradient-to-r hover:bg-gradient-to-l from-blue-600 to-purple-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500 cursor-pointer duration-1000">
              <span className="flex justify-between items-center gap-2">
              Start Now
              <span><MdOutlineEditNote className="text-2xl mt-1" /></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
