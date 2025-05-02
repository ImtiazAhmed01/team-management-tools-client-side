import { NavLink } from "react-router-dom";
import img1 from "../../assets/Screenshot_49-removebg-preview (1).png";
import useAuth from "../provider/useAuth";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  // if (user) {
  //   console.log(user)
  // }

  const handleLogout = () => {
    signOutUser()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full">
      {/* Navbar */}
      <div className="navbar flex justify-between items-center px-6 py-0 fixed top-0 right-0 left-0 z-20 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:shadow-gray-800 shadow-md">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <img
            src={img1}
            alt="Logo"
            className="w-24 h-[75px] hover:scale-105 transition-transform"
          />
          <div className="font-bold text-2xl lg:text-3xl hidden md:flex -ml-5 text-transparent bg-clip-text bg-gradient-to-r from-[#006dc7] via-blue-900 to-purple-500 dark:from-blue-400 dark:via-blue-300 dark:to-blue-700 hover:scale-105 transition-transform">
            <span className="">Collab</span>{" "}
            <span className="font-extrabold">Nest</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-6 font-medium">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[#006dc7] dark:text-blue-400 font-semibold border-b-2 border-[#006dc7] dark:border-blue-400 pb-1 px-1 transition-all"
                : "text-gray-600 dark:text-gray-300 hover:text-[#4978ff] dark:hover:text-blue-400 transition-colors"
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[#006dc7] dark:text-blue-400 font-semibold border-b-2 border-[#006dc7] dark:border-blue-400 pb-1 px-1 transition-all"
                : "text-gray-600 dark:text-gray-300 hover:text-[#4978ff] dark:hover:text-blue-400 transition-colors"
            }
            to="/aboutus"
          >
            About
          </NavLink>

          {user && (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-[#006dc7] dark:text-blue-400 font-semibold border-b-2 border-[#006dc7] dark:border-blue-400 pb-1 px-1 transition-all"
                  : "text-gray-600 dark:text-gray-300 hover:text-[#4978ff] dark:hover:text-blue-400 transition-colors"
              }
              to="/tasks"
            >
              Tasks
            </NavLink>
          )}
          {user && (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-[#006dc7] dark:text-blue-400 font-semibold border-b-2 border-[#006dc7] dark:border-blue-400 pb-1 px-1 transition-all"
                  : "text-gray-600 dark:text-gray-300 hover:text-[#4978ff] dark:hover:text-blue-400 transition-colors"
              }
              to="/image"
            >
              Gallery
            </NavLink>
          )}

          {user && (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-[#006dc7] dark:text-blue-400 font-semibold border-b-2 border-[#006dc7] dark:border-blue-400 pb-1 px-1 transition-all"
                  : "text-gray-600 dark:text-gray-300 hover:text-[#4978ff] dark:hover:text-blue-400 transition-colors"
              }
              to="/mytask"
            >
              My Tasks
            </NavLink>
          )}

          {!user ? (
            <>
              <NavLink to="/login">
                <button className="btn bg-gradient-to-r from-[#006dc7] to-[#4343e5] text-white px-6 font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-blue-500/30">
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="btn bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-purple-500/30">
                  SignUp
                </button>
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end mr-6 -ml-2">
              <div
                tabIndex={0}
                role="button"
                className="avatar cursor-pointer hover:scale-110 transition-transform"
              >
                <div className="w-10 rounded-full ring-2 ring-[#006dc7] dark:ring-blue-400">
                  <img
                    src={user?.photoURL}
                    alt="User Avatar"
                    title={user.displayName || "User"}
                  />
                </div>
              </div>
              <ul className="dropdown-content menu bg-white dark:bg-gray-800 rounded-box w-52 shadow-xl border border-gray-200 dark:border-gray-700 mt-4">
                <li>
                  <NavLink
                    to="/user"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#006dc7] dark:text-blue-400 bg-blue-50 dark:bg-gray-700"
                        : "hover:text-[#006dc7] dark:hover:text-blue-400 dark:text-blue-100"
                    }
                  >
                    {user.displayName || user.email}
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn bg-gradient-to-r from-[#006dc7] to-[#4343e5] text-white hover:scale-105 transition-transform mt-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content bg-white dark:bg-gray-900 rounded-box shadow-xl p-4 w-56 absolute right-0 mt-3 space-y-3 border border-gray-200 dark:border-gray-700"
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "block text-[#006dc7] dark:text-blue-400 font-medium bg-blue-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                    : "block text-gray-700 dark:text-gray-300 hover:text-[#4978ff] dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "block text-[#006dc7] dark:text-blue-400 font-medium bg-blue-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                    : "block text-gray-700 dark:text-gray-300 hover:text-[#4978ff] dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                }
                to="/aboutus"
              >
                About
              </NavLink>

              {user && (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "block text-[#006dc7] dark:text-blue-400 font-medium bg-blue-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                        : "block text-gray-700 dark:text-gray-300 hover:text-[#4978ff] dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                    to="/tasks"
                  >
                    Tasks
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "block text-[#006dc7] dark:text-blue-400 font-medium bg-blue-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                        : "block text-gray-700 dark:text-gray-300 hover:text-[#4978ff] dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                    to="/image"
                  >
                    Gallery
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "block text-[#006dc7] dark:text-blue-400 font-medium bg-blue-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                        : "block text-gray-700 dark:text-gray-300 hover:text-[#4978ff] dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                    to="/mytask"
                  >
                    My Tasks
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "block text-[#006dc7] dark:text-blue-400 font-medium bg-blue-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                        : "block text-gray-700 dark:text-gray-300 hover:text-[#4978ff] dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </>
              )}

              {!user ? (
                <>
                  <NavLink to="/login">
                    <button className="w-full btn bg-gradient-to-r from-[#006dc7] to-[#4343e5] text-white font-medium px-3 py-2 rounded-lg text-center hover:scale-105 transition-transform">
                      Login
                    </button>
                  </NavLink>
                  <NavLink to="/register">
                    <button className="w-full btn bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium px-3 py-2 rounded-lg text-center hover:scale-105 transition-transform mt-2">
                      Sign Up
                    </button>
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="divider my-1"></div>
                  <NavLink
                    to="/user"
                    className={({ isActive }) =>
                      isActive
                        ? "block text-orange-500 font-medium bg-orange-50 dark:bg-gray-800 px-3 py-2 rounded-lg"
                        : "block text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  >
                    {user.displayName || user.email}
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="w-full btn bg-gradient-to-r from-[#006dc7] to-[#4343e5] text-white font-medium px-3 py-2 rounded-lg text-center hover:scale-105 transition-transform"
                  >
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
