import React, { useState } from "react";
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Profile = () => {
  const initialBio =
    "I am an experienced Project Manager skilled in leading teams and delivering projects on time and within budget. With expertise in Agile and Waterfall methodologies, I focus on driving success through collaboration and efficient problem-solving.";

  // States to handle the editable mode
  const [isEditable, setIsEditable] = useState(false);

  // State for bio content
  const [bio, setBio] = useState(initialBio);

  // States for social media inputs
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "www.linkedin.com",
    portfolio: "www.portfolio.com",
    github: "www.github.com",
    instagram: "www.instagram.com",
  });

  // Toggle edit/save functionality
  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  // Handle bio input change
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  // Handle social media input changes
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  return (
    <div>
      {/* Main Profile Container */}
      <div className="md:w-8/10 mx-auto pb-10 bg-amber-50 md:my-10 md:rounded-xl flex flex-col gap-8 shadow-xl">
        {/* Banner */}
        <div>
          {/* Banner Image */}
          <div className="w-full lg:h-[300px] md:h-[250px] h-[150px] relative">
            <img
              src="https://c4.wallpaperflare.com/wallpaper/55/890/455/artwork-nature-landscape-fantasy-art-fire-trees-lava-cherry-blossom-clouds-smoke-digital-art-fightstar-album-covers-wallpaper-preview.jpg"
              className="w-full h-full object-cover md:rounded-tl-xl md:rounded-tr-xl"
              alt="Banner"
            />
          </div>

          {/* Profile Picture */}
          <div className="lg:w-[150px] md:w-[110px] md:h-[110px] lg:h-[150px] w-[80px] h-[80px] left-3 min-[320px]:top-[34%] min-[360px]:top-[22%] absolute lg:left-52 md:left-28 lg:top-[60%] md:top-[24%] 2xl:top-[40%] 2xl:left-[20%]">
            <img
              src="https://media.istockphoto.com/id/1195276356/photo/windows-silhouette-alone-men-black-and-white.jpg?s=612x612&w=0&k=20&c=CXelwmdWyJjCWwIRniNU0X6iCyB9diXUQ3bqb5pI8L4="
              className="w-full h-full rounded-full ring-4 ring-white shadow-2xl drop-shadow-2xl"
              alt="Profile"
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="lg:w-7/12 md:w-9/12 mx-auto md:pl-3 px-5 md:px-0">
          <div>
            <p className="text-black capitalize font-bold text-3xl">
              Franz Kafka
            </p>

            {/* Bio Section */}
            {/* Display Bio only when not in edit mode */}
            {!isEditable && (
              <p className="text-black font-semibold text-sm mt-1">{bio}</p>
            )}

            {/* Editable Bio Section */}
            {isEditable && (
              <div className="flex flex-col gap-3 mt-6">
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-black text-sm">BIO:</p>
                  <textarea
                    value={bio}
                    onChange={handleBioChange}
                    rows={3}
                    placeholder="Bio"
                    className="py-1 rounded-lg !text-gray-500 font-bold w-full border-2 border-gray-300 px-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Intro Section (Role, Location) */}
          <div className="flex md:flex-row flex-col justify-between items-center gap-6 mt-6">
            <div className="md:w-1/2 w-full">
              <h1 className="font-bold text-xl text-gray-600 mb-3">
                About Myself
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-black text-sm">Role:</p>
                  <input
                    type="text"
                    defaultValue="Project Manager"
                    placeholder="Role"
                    className="border-2 border-gray-300 py-1 px-3 rounded-lg !text-gray-500 font-bold w-full"
                    disabled={!isEditable} // Disable input when not in edit mode
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-black text-sm">Location:</p>
                  <input
                    type="text"
                    defaultValue="Dhaka, Bangladesh"
                    placeholder="Location"
                    className="border-2 border-gray-300 py-1 px-3 rounded-lg !text-gray-500 font-bold w-full"
                    disabled={!isEditable} // Disable input when not in edit mode
                  />
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="md:w-1/2 w-full">
              <h1 className="font-bold text-lg text-gray-600 mb-3">
                Social Media Profiles
              </h1>
              <div className="flex flex-col gap-3">
                {/* Social Media Links */}
                {[
                  {
                    platform: "linkedin",
                    label: "LinkedIn",
                    icon: <FaLinkedin />,
                  },
                  {
                    platform: "portfolio",
                    label: "Portfolio",
                    icon: <FaFacebook />,
                  },
                  { platform: "github", label: "GitHub", icon: <FaGithub /> },
                  {
                    platform: "instagram",
                    label: "Instagram",
                    icon: <FaInstagram />,
                  },
                ].map(({ platform, label, icon }) => (
                  <div className="relative" key={platform}>
                    <div className="absolute text-black text-lg right-3 top-2">
                      {icon}
                    </div>
                    {/* Editable Social Media input */}
                    <input
                      type="text"
                      name={platform} // Name attribute for handling individual social links
                      value={socialLinks[platform]} // Use state to bind the value
                      placeholder={label}
                      onChange={handleSocialChange} // Handle input change
                      className="border-2 border-gray-300 py-1 px-3 rounded-lg !text-gray-500 font-bold w-full"
                      disabled={!isEditable} // Disable input when not in edit mode
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Edit Button */}
        <div className="text-center">
          <button
            onClick={handleEditClick} // Toggle between edit and save
            className="px-8 py-2 text-lg font-medium text-white capitalize transition-colors transform bg-gradient-to-r hover:bg-gradient-to-l from-blue-600 to-purple-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500 cursor-pointer duration-1000">
            {isEditable ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
