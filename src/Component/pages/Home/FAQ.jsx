import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-11/12 mx-auto mb-10 rounded-md">
      <h1 className="font-bold text-center md:text-4xl text-3xl mb-8 dark:text-white">Some Important FAQ's</h1>

      <div
        id="accordion-open"
        data-accordion="open"
        className="bg-blue-50 dark:bg-gray-800 rounded-md"
      >
        {/* Accordion Item 1 */}
        <h2 id="accordion-open-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 gap-3"
            onClick={() => handleToggle(1)}
            aria-expanded={activeIndex === 1 ? "true" : "false"}
            aria-controls="accordion-open-body-1"
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 me-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Is this tool free to use?
            </span>
            <svg
              className={`w-3 h-3 rotate-180 shrink-0 ${
                activeIndex === 1 ? "rotate-0" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-1"
          className={`${
            activeIndex === 1 ? "block" : "hidden"
          } p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900`}
          aria-labelledby="accordion-open-heading-1"
        >
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Yes, this tool is completely free to use. There are no hidden
            charges, and you can access all the features without any cost. It's
            built to help you get the best experience without any financial
            commitment.
          </p>
        </div>

        {/* Accordion Item 2 */}
        <h2 id="accordion-open-heading-2">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 gap-3"
            onClick={() => handleToggle(2)}
            aria-expanded={activeIndex === 2 ? "true" : "false"}
            aria-controls="accordion-open-body-2"
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 me-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Do I need to install anything?
            </span>
            <svg
              className={`w-3 h-3 rotate-180 shrink-0 ${
                activeIndex === 2 ? "rotate-0" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-2"
          className={`${
            activeIndex === 2 ? "block" : "hidden"
          } p-5 border border-b-0 border-gray-200 dark:border-gray-700`}
          aria-labelledby="accordion-open-heading-2"
        >
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            No, you don’t need to install anything. This tool works entirely in
            your browser without the need for any installations or downloads.
          </p>
        </div>

        {/* Accordion Item 3 */}
        <h2 id="accordion-open-heading-3">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 gap-3"
            onClick={() => handleToggle(3)}
            aria-expanded={activeIndex === 3 ? "true" : "false"}
            aria-controls="accordion-open-body-3"
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 me-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Can I invite my team members?
            </span>
            <svg
              className={`w-3 h-3 rotate-180 shrink-0 ${
                activeIndex === 3 ? "rotate-0" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-3"
          className={`${
            activeIndex === 3 ? "block" : "hidden"
          } p-5 border border-t-0 border-gray-200 dark:border-gray-700`}
          aria-labelledby="accordion-open-heading-3"
        >
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Yes, you can invite your team members to collaborate on your
            projects and share access to tools, depending on the access
            permissions of the platform you're using.
          </p>
        </div>

        {/* Accordion Item 4 */}
        <h2 id="accordion-open-heading-4">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 gap-3"
            onClick={() => handleToggle(4)}
            aria-expanded={activeIndex === 4 ? "true" : "false"}
            aria-controls="accordion-open-body-4"
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 me-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Can I use the tool on mobile devices?
            </span>
            <svg
              className={`w-3 h-3 rotate-180 shrink-0 ${
                activeIndex === 4 ? "rotate-0" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-3"
          className={`${
            activeIndex === 4 ? "block" : "hidden"
          } p-5 border border-t-0 border-gray-200 dark:border-gray-700`}
          aria-labelledby="accordion-open-heading-3"
        >
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Yes! The tool is designed to be responsive, meaning it will work on
            smartphones and tablets. You can access it from any mobile device
            through your browser, and everything will adjust to fit your screen
            for a smooth experience.
          </p>
        </div>

        {/* Accordion Item 5 */}
        <h2 id="accordion-open-heading-5">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 gap-3"
            onClick={() => handleToggle(5)}
            aria-expanded={activeIndex === 5 ? "true" : "false"}
            aria-controls="accordion-open-body-5"
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 me-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              How secure is my data?
            </span>
            <svg
              className={`w-3 h-3 rotate-180 shrink-0 ${
                activeIndex === 5 ? "rotate-0" : ""
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-3"
          className={`${
            activeIndex === 5 ? "block" : "hidden"
          } p-5 border border-t-0 border-gray-200 dark:border-gray-700`}
          aria-labelledby="accordion-open-heading-3"
        >
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            We take data security seriously. Your information is stored securely
            using encryption methods to protect your privacy. We don’t share
            your data with third parties, and we make sure that it is safe and
            secure at all times.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
