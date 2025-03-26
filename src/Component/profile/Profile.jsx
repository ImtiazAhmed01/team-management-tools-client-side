import React, { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import useAuth from "../provider/useAuth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [bio, setBio] = useState("Add Your Bio..");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    portfolio: "",
    github: "",
  });

  useEffect(() => {
    if (user?.email) {
      fetch(`https://teammanagementtools.vercel.app/profileInfo/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const userData = data?.[0] || {};
          setUserData(userData);

          setSocialLinks({
            linkedin: userData.socialLinks?.linkedin || "",
            portfolio: userData.socialLinks?.portfolio || "",
            github: userData.socialLinks?.github || "",
          });

          setBio(userData?.bio || "Add Your Bio..");
          setRole(userData?.role || "");
          setLocation(userData?.location || "");
        });
    }
  }, [user?.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "bio") {
      setBio(value);
    } else if (name === "role") {
      setRole(value);
    } else if (name === "location") {
      setLocation(value);
    } else {
      setSocialLinks({ ...socialLinks, [name]: value });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);

    const profileInfo = { bio, role, location, socialLinks };

    try {
      const response = await fetch(
        `https://teammanagementtools.vercel.app/profile/${user?.email}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(profileInfo),
        }
      );
      const data = await response.json();

      if (response.ok && data.message === "profile updated successfully!") {
        setUserData((prevData) => ({
          ...prevData,
          bio,
          role,
          location,
          socialLinks,
        }));

        setBio(bio);
        setRole(role);
        setLocation(location);
        setSocialLinks(socialLinks);
        toast.success("Info updated successfully!");

      } else if (response.ok && data.message === "Info added successfully!") {
        setUserData((prevData) => ({
          ...prevData,
          bio,
          role,
          location,
          socialLinks,
        }));

        toast.success("Info added successfully!");
      } else if (data.status === 400) {
        toast.error(data.message || "Failed to update info");
      }
    } catch (error) {
      console.log("Error during fetch:", error);
    }
  };

  return (
    <div>
      {/* Profile Container */}
      <div className="md:w-8/10 mx-auto pb-10 bg-amber-50 md:my-10 md:rounded-xl flex flex-col gap-8 shadow-xl">
        {/* Banner */}
        <div>
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
              src={
                user
                  ? user.photoUrl
                  : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
              }
              className="w-full h-full rounded-full ring-4 ring-white shadow-2xl drop-shadow-2xl"
              alt="Profile"
            />
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:w-7/12 md:w-9/12 mx-auto md:pl-3 px-5 md:px-0">
          <div>
            <p className="text-black capitalize font-bold text-3xl">
              {user ? user.displayName : "N/A"}
            </p>

            {/* Bio Section */}
            {!isEditable && (
              <p className="text-black font-semibold text-sm mt-1">
                {userData?.bio}
              </p>
            )}

            {isEditable && (
              <div className="flex flex-col gap-3 mt-6">
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-black text-sm">BIO:</p>
                  <textarea
                    name="bio"
                    value={bio}
                    onChange={handleInputChange}
                    rows={3}
                    maxLength={100}
                    placeholder="Write Your Bio"
                    className="py-1 rounded-lg !text-gray-500 font-bold w-full border-2 border-gray-300 px-2"
                  />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleUpdateProfile}>
            <div className="flex md:flex-row flex-col justify-between items-center gap-6 mt-6">
              <div className="md:w-1/2 w-full">
                <h1 className="font-bold text-xl text-gray-600 mb-3">
                  About Yourself
                </h1>
                <div className="flex flex-col gap-3">
                  {/* Role Input */}
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-black text-sm">Role:</p>
                    <input
                      type="text"
                      name="role"
                      value={role}
                      onChange={handleInputChange}
                      placeholder="Your Role"
                      className="border-2 border-gray-300 py-1 px-3 rounded-lg !text-gray-500 font-bold w-full"
                      disabled={!isEditable}
                    />
                  </div>

                  {/* Location Input */}
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-black text-sm">Location:</p>
                    <input
                      type="text"
                      name="location"
                      value={location}
                      onChange={handleInputChange}
                      placeholder="Your Location"
                      className="border-2 border-gray-300 py-1 px-3 rounded-lg !text-gray-500 font-bold w-full"
                      disabled={!isEditable}
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
                    { platform: "github", label: "Github", icon: <FaGithub /> },
                  ].map(({ platform, label, icon }) => (
                    <div className="relative" key={platform}>
                      <div className="absolute text-black text-lg right-3 top-2">
                        {icon}
                      </div>
                      {isEditable ? (
                        <input
                          type="text"
                          name={platform}
                          value={socialLinks[platform] || ""}
                          onChange={handleInputChange}
                          placeholder={
                            socialLinks[platform]
                              ? `Update your ${label} link`
                              : `Enter your ${label} link`
                          }
                          className="border-2 border-gray-300 py-1 px-3 rounded-lg !text-gray-500 font-bold w-full"
                        />
                      ) : (
                        <a
                          href={socialLinks[platform] || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-2 border-gray-300 py-1 px-3 rounded-lg !text-gray-500 font-bold w-full text-left"
                          style={{ display: "block" }}
                        >
                          {socialLinks[platform] || `Enter your ${label} link`}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-8 py-2 text-lg font-medium text-white capitalize transition-colors transform bg-gradient-to-r hover:bg-gradient-to-l from-blue-600 to-purple-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500 cursor-pointer duration-1000"
              >
                {isEditable ? "Save" : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
