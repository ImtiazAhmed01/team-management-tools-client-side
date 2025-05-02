import img1 from "../../assets/Screenshot_49-removebg-preview (1).png";

const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 pt-12 pb-4">
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center md:text-left md:place-items-center">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-start lg:-ml-0 -ml-7">
                <img src={img1} alt="Logo" className="w-24 h-[70px]" />
                <div className="font-bold text-3xl flex -ml-5 text-transparent bg-clip-text bg-gradient-to-r from-[#006dc7] via-blue-900 to-purple-500 dark:from-blue-400 dark:via-blue-300 dark:to-blue-700">
                  <span className="">Collab</span>{" "}
                  <span className="font-extrabold">Nest</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed lg:px-8 lg:pr-0 pr-6 text-left">
              CollabNest is a powerful team collaboration platform designed to
              streamline communication, task management, and file sharing for
              modern teams.And real time chat with team members.
            </p>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Services",
              links: [
                "Recruitment Services",
                "Support",
                "Security Measures",
                "Copyright Information",
              ],
            },
            {
              title: "Company",
              links: ["About Us", "Blogs", "FAQs", "Events"],
            },
            {
              title: "Legal",
              links: [
                "Terms & Conditions",
                "Privacy Policy",
                "Disclaimer",
                "Accessibility",
              ],
            },
          ].map((column, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-base font-semibold text-gray-800 dark:text-gray-100 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-8 after:h-0.5 after:bg-gradient-to-r from-blue-500 to-purple-500 text-left">
                {column.title}
              </h4>
              <ul className="space-y-2.5">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mr-2 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-all duration-200 transform group-hover:scale-125"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} CollabNest. All rights reserved.
          </p>
          <div className="">
            {/* <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Follow Us
            </h4> */}
            <div className="flex justify-center md:justify-start space-x-2">
              {[
                {
                  name: "Facebook",
                  icon: "https://img.icons8.com/fluency/48/facebook-new.png",
                },
                {
                  name: "LinkedIn",
                  icon: "https://img.icons8.com/fluency/48/linkedin.png",
                },
                {
                  name: "Instagram",
                  icon: "https://img.icons8.com/fluency/48/instagram-new.png",
                },
                {
                  name: "Twitter",
                  icon: "https://img.icons8.com/color/48/twitterx--v1.png",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="p-1.5 rounded-full bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
                >
                  <img
                    src={social.icon}
                    className="w-6 h-6 filter brightness-90 dark:brightness-110"
                    alt={social.name}
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-xs transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-xs transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-xs transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
