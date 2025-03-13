import { NavLink } from "react-router-dom";
import img1 from "../../assets/Screenshot_49-removebg-preview (1).png";

const Navbar = () => {
  const user = false;

  return (
    <div className="w-full">
      {/* Navbar */}
      <div className="navbar flex justify-between items-center px-6 py-3 bg-white">
        
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <img src={img1} alt="Logo" className="w-24 h-20" />
          <div className="font-bold text-2xl lg:text-3xl hidden md:flex">
              <span className="text-[#006dc7]">Collab</span>{" "}
              <span >Nest</span>
            </div>
        </div>

       
        <div className="hidden lg:flex items-center space-x-6 font-semibold">
          <NavLink className="hover:text-[#4978ff]" to="/">Home</NavLink>
          <NavLink className="hover:text-[#4978ff]" to="/about">About</NavLink>
          <NavLink className="hover:text-[#4978ff]" to="/Products">Features</NavLink>
          <NavLink className="hover:text-[#4978ff]" to="/Tasks">Tasks</NavLink>
          <NavLink className="hover:text-[#4978ff]" to="/contact">Contact</NavLink>
          {user && <NavLink className="hover:text-[#4978ff]" to="/dashboard">DashBoard</NavLink>}

         
          {!user ? (
            <>
              <NavLink to="/login">
                <button className="btn bg-[#006dc7] text-white px-6 font-semibold hover:bg-[#4343e5] hover:scale-105">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="btn bg-[#006dc7] text-white px-6 font-semibold hover:bg-[#4343e5] hover:scale-105">
                  SignUp
                </button>
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-52 shadow">
                  <li>
                    <button className="btn bg-[#006dc7] text-white px-6 font-semibold">Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        
        <div className="lg:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100 rounded-box shadow p-3 w-48 absolute right-0 mt-3 space-y-2"
            >
              <NavLink className="block hover:text-[#4978ff]" to="/">Home</NavLink>
              <NavLink className="block hover:text-[#4978ff]" to="/about">About</NavLink>
              <NavLink className="block hover:text-[#4978ff]" to="/Products">Features</NavLink>
              <NavLink className="block hover:text-[#4978ff]" to="/Tasks">Tasks</NavLink>
              <NavLink className="block hover:text-[#4978ff]" to="/contact">Contact</NavLink>
              {user && <NavLink className="block hover:text-[#4978ff]" to="/dashboard">DashBoard</NavLink>}
            </ul>
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default Navbar;
