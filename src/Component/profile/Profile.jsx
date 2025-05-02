// import React, { useEffect, useState } from "react";
// import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
// import useAuth from "../provider/useAuth";
// import { toast, Bounce } from "react-toastify";
// import { IoCameraReverseOutline } from "react-icons/io5";
// import axios from "axios";

// const Profile = () => {
//   const { user } = useAuth();
//   const [userData, setUserData] = useState({});
//   const [isEditable, setIsEditable] = useState(false);
//   const [bio, setBio] = useState("Add Your Bio..");
//   const [role, setRole] = useState("");
//   const [location, setLocation] = useState("");
//   const [status, setStatus] = useState("");
//   const [socialLinks, setSocialLinks] = useState({
//     linkedin: "",
//     portfolio: "",
//     github: "",
//   });
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:5000/profileInfo/${user.email}`)
//         .then((res) => res.json())
//         .then((data) => {
//           const userData = data?.[0] || {};
//           setUserData(userData);
//           setStatus(userData?.status);
//           setRole(userData?.role || "not set yet");
//           setBio(userData?.bio || "Add Your Bio..");
//           setLocation(userData?.location || "Not set yet");
//           setSocialLinks({
//             linkedin: userData.socialLinks?.linkedin || "",
//             portfolio: userData.socialLinks?.portfolio || "",
//             github: userData.socialLinks?.github || "",
//           });
//         })
//         .catch((error) => console.error("Error fetching user data:", error));
//     }
//   }, [user?.email]);

//   //  fetching user role----srity
//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`http://localhost:5000/profileInfo/${user?.email}`)
//         .then((res) => {
//           const userData = res.data?.[0];
//           setRole(userData?.role);
//           // console.log(userData)
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [user?.email]);

//   useEffect(() => {
//     if (role === "admin") {
//       fetch("http://localhost:5000/leaderRequests")
//         .then((res) => res.json())
//         .then((data) => setRequests(data))
//         .catch((err) => console.error("Error fetching leader requests:", err));
//     }
//   }, [role]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "bio") setBio(value);
//     else if (name === "role") setRole(value);
//     else if (name === "location") setLocation(value);
//     else if (name === "status") setStatus(value);
//     else setSocialLinks({ ...socialLinks, [name]: value });
//   };

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setIsEditable(!isEditable);

//     const profileInfo = { bio, role, location, socialLinks, status };

//     try {
//       // If user is trying to set role to group leader (but is not already group leader/admin), request approval instead
//       if (
//         role === "group leader" &&
//         userData.role !== "group leader" &&
//         userData.role !== "admin"
//       ) {
//         const response = await fetch("http://localhost:5000/requestLeader", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ name: user.displayName, email: user.email }),
//         });

//         const result = await response.json();

//         if (response.ok) {
//           toast.success("Leader request sent to admin", {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: false,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//             transition: Bounce,
//           });
//         } else {
//           toast.error(result.message || "Request failed", {
//             position: "top-right",
//             autoClose: 5000,
//           });
//         }

//         return; // Don't try to update role directly
//       }

//       const response = await fetch(
//         `http://localhost:5000/profile/${user?.email}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(profileInfo),
//         }
//       );

//       const data = await response.json();

//       if (response.ok && data.message === "profile updated successfully!") {
//         const updatedRes = await fetch(
//           `http://localhost:5000/profileInfo/${user.email}`
//         );
//         const updatedProfile = await updatedRes.json();
//         const updatedUserData = updatedProfile?.[0] || {};
//         setUserData(updatedUserData);
//         setBio(updatedUserData?.bio || "Add Your Bio..");
//         setRole(updatedUserData?.role || "");
//         setLocation(updatedUserData?.location || "");
//         setSocialLinks({
//           linkedin: updatedUserData.socialLinks?.linkedin || "",
//           portfolio: updatedUserData.socialLinks?.portfolio || "",
//           github: updatedUserData.socialLinks?.github || "",
//         });
//         setStatus(updatedUserData?.status || "Available");

//         toast.success("Info updated successfully!", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           transition: Bounce,
//         });
//       } else {
//         toast.error(data.status === 400 || "Failed to update info", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           transition: Bounce,
//         });
//       }
//     } catch (error) {
//       console.log("Error during fetch:", error);
//     }
//   };

//   const handleApproveLeader = async (email) => {
//     try {
//       const res = await fetch(`http://localhost:5000/approveLeader/${email}`, {
//         method: "PATCH",
//       });
//       const data = await res.json();
//       if (res.ok && data.modifiedCount > 0) {
//         toast.success(`Approved ${email} as group leader`, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: false,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//           transition: Bounce,
//         });
//         setRequests(requests.filter((req) => req.email !== email));
//       }
//     } catch (error) {
//       toast.error("Approval failed", {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         transition: Bounce,
//       });
//     }
//   };

//   const [image, setImage] = useState(user?.photoURL);
//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const { data } = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_Key}`,
//         formData
//       );

//       if (data.success) {
//         const image_url = data.data.display_url;
//         toast.success("Image uploaded successfully");

//         await axios.patch(`http://localhost:5000/user/${user?.email}`, {
//           image: image_url,
//         });

//         setImage(image_url);
//       }
//     } catch (error) {
//       console.error("Error uploading or updating image:", error);
//       toast.error("Something went wrong while updating the image.");
//     }
//   };

//   return (
//     <div className="md:w-8/10 mx-auto pb-10 bg-amber-50 md:my-10 md:rounded-xl flex flex-col gap-8 shadow-xl">
//       {/* Profile Header */}
//       <div>
//         <div className="w-full lg:h-[300px] md:h-[250px] h-[150px] relative">
//           <img
//             src="https://c4.wallpaperflare.com/wallpaper/55/890/455/artwork-nature-landscape-fantasy-art-fire-trees-lava-cherry-blossom-clouds-smoke-digital-art-fightstar-album-covers-wallpaper-preview.jpg"
//             className="w-full h-full object-cover md:rounded-tl-xl md:rounded-tr-xl"
//             alt="Banner"
//           />
//         </div>
//         <div className="lg:w-[150px] md:w-[110px] md:h-[110px] lg:h-[150px] w-[80px] h-[80px] -translate-y-[150%] translate-x-[40%] absolute">
//           <img
//             src={
//               image ||
//               "https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=166&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
//             }
//             className={`w-full h-full rounded-full ring-2 shadow-2xl drop-shadow-2xl ${userData?.status === "Available"
//                 ? "ring-green-500"
//                 : userData?.status === "Busy"
//                   ? "ring-yellow-500"
//                   : userData?.status === "Unavailable"
//                     ? "ring-red-500"
//                     : "ring-white"
//               }`}
//             alt="Profile"
//           />
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageChange}
//           />
//           <div className="absolute lg:top-4 top-1 md:right-1 -right-2 lg:right-1 bg-gray-300 rounded-full p-1 cursor-pointer">
//             <IoCameraReverseOutline
//               onClick={() => document.getElementById("image").click()}
//               className="text-gray-900 text-xl"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Profile Content */}
//       <div className="lg:w-7/12 md:w-9/12 w-full mx-auto md:pl-3 px-5 md:px-0">
//         <div className="flex md:flex-row justify-between items-center">
//           <p className="text-black capitalize font-bold text-3xl">
//             {user ? user.displayName : "N/A"}
//           </p>
//           {!isEditable ? (
//             <p className="text-black font-semibold text-sm">
//               {status || "Available"}
//             </p>
//           ) : (
//             <select
//               name="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="p-1 border border-gray-300 rounded-md font-semibold text-xs"
//             >
//               <option value="">Your Status</option>
//               <option value="Available">Available</option>
//               <option value="Busy">Busy</option>
//               <option value="Unavailable">Unavailable</option>
//             </select>
//           )}
//         </div>

//         {!isEditable && (
//           <p className="text-black font-semibold text-sm mt-1">
//             {userData?.bio}
//           </p>
//         )}
//         {isEditable && (
//           <div className="flex flex-col gap-3 mt-6">
//             <div className="flex flex-col gap-1">
//               <p className="font-bold text-black text-sm">BIO:</p>
//               <textarea
//                 name="bio"
//                 value={bio}
//                 onChange={handleInputChange}
//                 rows={3}
//                 maxLength={100}
//                 className="py-1 rounded-lg border-2 border-gray-300 px-2 text-gray-500 font-bold"
//               />
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleUpdateProfile}>
//           <div className="flex md:flex-row flex-col gap-6 mt-6">
//             {/* About Section */}
//             <div className="md:w-1/2 w-full">
//               <h1 className="font-bold text-xl text-gray-600 mb-3">
//                 About Yourself
//               </h1>
//               <div className="flex flex-col gap-3">
//                 {/* Role Dropdown */}
//                 <div className="flex flex-col gap-1">
//                   <p className="font-bold text-black text-sm">Role:</p>
//                   {isEditable ? (
//                     <select
//                       name="role"
//                       value={role}
//                       onChange={handleInputChange}
//                       disabled={role === "admin"}
//                       className="border-2 border-gray-300 py-1 px-3 rounded-lg text-gray-500 font-bold"
//                     >
//                       <option value="">Select Role</option>
//                       <option value="admin">Admin</option>
//                       <option value="group leader">Leader</option>
//                       <option value="member">Member</option>
//                     </select>
//                   ) : (
//                     <p className="text-black font-semibold text-sm">
//                       {role || "Not set"}
//                     </p>
//                   )}
//                 </div>

//                 {/* Location */}
//                 <div className="flex flex-col gap-1">
//                   <p className="font-bold text-black text-sm">Location:</p>
//                   <input
//                     type="text"
//                     name="location"
//                     value={location}
//                     onChange={handleInputChange}
//                     disabled={!isEditable}
//                     className="border-2 border-gray-300 py-1 px-3 rounded-lg text-gray-500 font-bold"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Social Media */}
//             <div className="md:w-1/2 w-full">
//               <h1 className="font-bold text-lg text-gray-600 mb-3">
//                 Social Media Profiles
//               </h1>
//               <div className="flex flex-col gap-3">
//                 {[
//                   {
//                     platform: "linkedin",
//                     label: "LinkedIn",
//                     icon: <FaLinkedin />,
//                   },
//                   {
//                     platform: "portfolio",
//                     label: "Portfolio",
//                     icon: <FaFacebook />,
//                   },
//                   { platform: "github", label: "Github", icon: <FaGithub /> },
//                 ].map(({ platform, label, icon }) => (
//                   <div className="relative" key={platform}>
//                     <div className="absolute right-3 top-2 text-black text-lg">
//                       {icon}
//                     </div>
//                     {isEditable ? (
//                       <input
//                         type="text"
//                         name={platform}
//                         value={socialLinks[platform]}
//                         onChange={handleInputChange}
//                         placeholder={`Enter your ${label} link`}
//                         className="border-2 border-gray-300 py-1 px-3 rounded-lg text-gray-500 font-bold w-full"
//                       />
//                     ) : (
//                       <a
//                         href={socialLinks[platform] || "#"}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="border-2 border-gray-300 py-1 px-3 rounded-lg text-gray-500 font-bold w-full block"
//                       >
//                         {socialLinks[platform] || `Enter your ${label} link`}
//                       </a>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Save/Edit Button */}
//           <div className="text-center mt-6">
//             <button
//               type="submit"
//               className="px-8 py-2 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md transition duration-500 hover:bg-blue-700"
//             >
//               {isEditable ? "Save" : "Edit"}
//             </button>
//           </div>
//         </form>

//         {/* Admin Role - Leader Requests Table */}
//         {/* Admin Role - Leader Requests Table */}
//         {role === "admin" && (
//           <div className="mt-10">
//             <h2 className="text-xl font-bold text-center text-blue-700 mb-4">
//               Group Leader Requests
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
//                 <thead>
//                   <tr className="bg-gray-200 text-gray-700 text-sm uppercase">
//                     <th className="px-4 py-2">Name</th>
//                     <th className="px-4 py-2">Email</th>
//                     <th className="px-4 py-2">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {requests.map((request) => (
//                     <tr key={request._id} className="text-center">
//                       <td className="px-4 py-2">{request.name}</td>
//                       <td className="px-4 py-2">{request.email}</td>
//                       <td className="px-4 py-2">
//                         <button
//                           onClick={() => handleApproveLeader(request.email)}
//                           className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded"
//                         >
//                           Approve
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                   {requests.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan="3"
//                         className="text-gray-500 py-4 text-center"
//                       >
//                         No group leader requests
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import useAuth from "../provider/useAuth";
import { toast, Bounce } from "react-toastify";
import { IoCameraReverseOutline } from "react-icons/io5";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [bio, setBio] = useState("Add Your Bio..");
  const [userRole, setUserRole] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [requestSent, setRequestSent] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    portfolio: "",
    github: "",
  });
  const [requests, setRequests] = useState([]);

  // console.log(userData?.userImage)

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/profileInfo/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const userData = data?.[0] || {};
          setUserData(userData);
          setStatus(userData?.status);
          setUserRole(userData?.role || "not set yet");
          setBio(userData?.bio || "Add Your Bio..");
          setLocation(userData?.location || "Not set yet");
          setSocialLinks({
            linkedin: userData.socialLinks?.linkedin || "",
            portfolio: userData.socialLinks?.portfolio || "",
            github: userData.socialLinks?.github || "",
          });
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user?.email]);

  //  fetching user role----srity
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/profileInfo/${user?.email}`)
        .then((res) => {
          const userData = res.data?.[0];
          setUserRole(userData?.userRole);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  useEffect(() => {
    if (userRole === "admin") {
      fetch("http://localhost:5000/leaderRequests")
        .then((res) => res.json())
        .then((data) => setRequests(data))
        .catch((err) => console.error("Error fetching leader requests:", err));
    }
  }, [userRole]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "bio") setBio(value);
    else if (name === "role") setUserRole(value);
    else if (name === "location") setLocation(value);
    else if (name === "status") setStatus(value);
    else setSocialLinks({ ...socialLinks, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);

    const profileInfo = { bio, userRole, location, socialLinks, status };

    try {
      // Group leader request logic
      if (
        userRole === "group leader" &&
        userData.userRole !== "group leader" &&
        userData.userRole !== "admin"
      ) {
        const response = await fetch("http://localhost:5000/requestLeader", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: user.displayName, email: user.email }),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success("Leader request sent to admin");
        } else {
          toast.error(result.message || "Request failed", {
            position: "top-right",
            autoClose: 5000,
          });
        }
        return;
      }

      // Regular profile update
      const response = await fetch(
        `http://localhost:5000/profile/${user?.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileInfo),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      if (data.success) {
        // Use the returned user data instead of making an additional request
        const updatedUserData = data.user || {};

        setUserData(updatedUserData);
        setBio(updatedUserData?.bio || "Add Your Bio..");
        setUserRole(updatedUserData?.userRole || "");
        setLocation(updatedUserData?.location || "");
        setSocialLinks({
          linkedin: updatedUserData.socialLinks?.linkedin || "",
          portfolio: updatedUserData.socialLinks?.portfolio || "",
          github: updatedUserData.socialLinks?.github || "",
        });
        setStatus(updatedUserData?.status || "Available");

        toast.success(data.message || "Profile updated successfully!");
      } else {
        toast.error(data.message || "No changes were made");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Network error - please try again");
    }
  };
  // req for group leader to db
  const handleRequestGroupLeader = async () => {
    try {
      const res = await fetch("http://localhost:5000/groupLeaderRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          name: user?.displayName,
          uid: user?.uid,
          requestedAt: new Date().toISOString(),
          status: "pending",
        }),
      });

      if (res.ok) {
        toast.success("Request sent to admin", {
          position: "top-right",
          autoClose: 5000,
        });
        setRequestSent(true);
      } else {
        toast.error("Failed to send request", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  // approving or not
  const handleApproveLeader = async (email) => {
    // Show toast immediately
    toast.success(`Approved ${email} as group leader`, {
      position: "top-center",
      autoClose: 3000,
      theme: "light",
      transition: Bounce,
    });

    // Optimistically update status
    setRequests((prev) =>
      prev.map((req) =>
        req.email === email ? { ...req, status: "approved" } : req
      )
    );

    try {
      const res = await fetch(`http://localhost:5000/approveLeader/${email}`, {
        method: "PATCH",
      });
      const data = await res.json();
      console.log({ res, data });

      // Optionally handle failed response
      if (!res.ok || data.modifiedCount <= 0) {
        throw new Error("Approval failed on server");
      }
    } catch (error) {
      toast.error("Approval failed on server", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleDeclineLeader = async (email) => {
    // Show toast immediately
    toast.success(`Declined ${email} as group leader`, {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
      transition: Bounce,
    });

    // Optimistically update status
    setRequests((prev) =>
      prev.map((req) =>
        req.email === email ? { ...req, status: "declined" } : req
      )
    );

    try {
      const res = await fetch(`http://localhost:5000/declineLeader/${email}`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (!res.ok || data.modifiedCount <= 0) {
        throw new Error("Decline failed on server");
      }
    } catch (error) {
      toast.error("Approval failed", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const [image, setImage] = useState(() => {
    const savedImage = localStorage.getItem("userProfileImage");
    return (
      savedImage ||
      user?.photoURL ||
      user?.userImage ||
      userData?.userImage ||
      userData?.photoURL ||
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    );
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    setIsUploading(true);
    const file = e.target.files[0];
    if (!file) {
      setIsUploading(false);
      return;
    }

    // File validations
    if (!file.type.match("image.*")) {
      toast.error("Please select an image file (JPEG, PNG, etc.)");
      setIsUploading(false);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      // 1. Upload to ImgBB
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_Key}`,
        formData
      );

      if (data.success) {
        const image_url = data.data.display_url;

        // 2. Update in backend
        try {
          const response = await axios.patch(
            `http://localhost:5000/userImage/${user?.email}`,
            { image: image_url }
          );

          if (response.data.success) {
            // 3. Update all states and storage
            setImage(image_url);
            localStorage.setItem("userProfileImage", image_url);

            // 4. Update userData state with the returned data
            setUserData(response.data.updatedUser);

            toast.success("Profile image updated successfully");
          } else {
            toast.error(
              response.data.message || "Failed to update profile image"
            );
          }
        } catch (patchError) {
          console.error("Error in PATCH request:", patchError);
          toast.error("Profile update failed - contact support");
        }
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  // initial load and userData updates
  useEffect(() => {
    if (userData?.userImage || userData?.photoURL) {
      const newImage = userData?.userImage || userData?.photoURL;
      setImage(newImage);
      localStorage.setItem("userProfileImage", newImage);
    }
  }, [userData]);

  return (
    <div className="max-w-6xl mx-auto pb-10 bg-white dark:bg-gray-800 md:my-10 rounded-xl flex flex-col gap-8 shadow-lg overflow-hidden">
      {/* Profile Header - Enhanced */}
      <div className="relative">
        <div className="w-full h-48 md:h-56 lg:h-64 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            className="w-full h-full object-cover opacity-90"
            alt="Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        // Profile Picture Component
        <div className="absolute -bottom-10 left-6 md:left-8">
          <div className="relative group">
            <img
              src={image}
              className={`w-28 h-28 md:w-32 md:h-32 rounded-full border-2 object-cover shadow-xl ${
                userData?.status === "Available"
                  ? "border-green-500"
                  : userData?.status === "Busy"
                  ? "border-yellow-500"
                  : userData?.status === "Unavailable"
                  ? "border-red-500"
                  : "border-white dark:border-gray-700"
              }`}
              alt="Profile"
            />
            <label
              htmlFor="image"
              className={`absolute bottom-0 right-0 p-2 rounded-full shadow-md cursor-pointer transform transition-transform hover:scale-110 ${
                isUploading ? "bg-gray-400" : "bg-white dark:bg-gray-700"
              }`}
            >
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <IoCameraReverseOutline className="text-gray-800 dark:text-gray-200 text-lg" />
              )}
              <input
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Profile Content - Enhanced */}
      <div className="px-6 md:px-8 lg:px-10 mt-16 md:mt-20">
        {/* Name and Status */}
        <div className="flex md:flex-row flex-col justify-between items-center mb-6">
          <div className="flex flex-row gap-3 items-center -ml-12 md:-ml-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white capitalize">
              {user ? user.displayName : "N/A"}
            </h1>
            {!isEditable ? (
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                  userData?.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : userData?.status === "Busy"
                    ? "bg-yellow-100 text-yellow-800"
                    : userData?.status === "Unavailable"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {status || "Available"}
              </span>
            ) : (
              <select
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsEditable(!isEditable)}
            className={`-ml-44 md:-ml-44 mt-4 md:mt-0 md:px-6 px-4 md:py-2 py-1 rounded-lg font-medium transition-colors ${
              isEditable
                ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
            }`}
          >
            {isEditable ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Bio */}
        {!isEditable && userData?.bio && (
          <p className="text-gray-600 dark:text-gray-300 mb-6 px-1">
            {userData.bio}
          </p>
        )}
        {isEditable && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={bio}
              onChange={handleInputChange}
              rows={3}
              maxLength={150}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {bio.length}/150 characters
            </p>
          </div>
        )}

        <form onSubmit={handleUpdateProfile}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* About Section */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
                About
              </h2>

              {/* Role  */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <p className="text-gray-800 dark:text-white font-medium">
                  {userRole || "Not set"}
                </p>

                {userRole === "admin" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    You are an Admin
                  </p>
                )}
                {userRole === "group leader" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    You are a Group Leader
                  </p>
                )}
                {userRole !== "admin" &&
                  userRole !== "group leader" &&
                  !requestSent && (
                    <button
                      type="button"
                      onClick={handleRequestGroupLeader}
                      className="mt-3 w-full md:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Request Group Leader Role
                    </button>
                  )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                {isEditable ? (
                  <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Your location"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white font-medium">
                    {location || "Not specified"}
                  </p>
                )}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-600">
                Social Links
              </h2>

              {[
                {
                  platform: "linkedin",
                  label: "LinkedIn",
                  icon: (
                    <FaLinkedin className="text-blue-700 dark:text-blue-500" />
                  ),
                },
                {
                  platform: "portfolio",
                  label: "Portfolio",
                  icon: (
                    <FaFacebook className="text-blue-600 dark:text-blue-400" />
                  ),
                },
                {
                  platform: "github",
                  label: "GitHub",
                  icon: (
                    <FaGithub className="text-gray-800 dark:text-gray-300" />
                  ),
                },
              ].map(({ platform, label, icon }) => (
                <div key={platform} className="mb-4 last:mb-0">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                  </label>
                  {isEditable ? (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                      </div>
                      <input
                        type="url"
                        name={platform}
                        value={socialLinks[platform]}
                        onChange={handleInputChange}
                        placeholder={`https://${platform}.com/yourusername`}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  ) : socialLinks[platform] ? (
                    <a
                      href={socialLinks[platform]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-white dark:bg-gray-600 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="mr-2">{icon}</span>
                      <span className="text-blue-600 dark:text-blue-400 truncate max-w-xs">
                        {socialLinks[platform]}
                      </span>
                    </a>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      Not provided
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Save Button - Only shown in edit mode */}
          {isEditable && (
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>

        {/* Admin dashboard */}
        {userRole === "admin" && (
          <div className="mt-12 lg:w-10/12 mx-auto">
            <h2 className="text-xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
              Group Leader Requests
            </h2>
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-50 dark:bg-gray-600">
                    <tr>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-2/6 mx-auto">
                        Email
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                    {requests.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center">
                          <div className="flex flex-col items-center justify-center py-4 text-gray-500 dark:text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 mb-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <p>No pending group leader requests</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      requests.map((request) => (
                        <tr key={request._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-center">
                            {request.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center">
                            {request.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                            {request.status === "approved" ? (
                              <span className="text-green-600 dark:text-green-400 font-semibold">
                                Approved
                              </span>
                            ) : request.status === "declined" ? (
                              <span className="text-red-600 dark:text-red-400 font-semibold">
                                Declined
                              </span>
                            ) : (
                              <div className="space-x-2">
                                <button
                                  onClick={() =>
                                    handleApproveLeader(request.email)
                                  }
                                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-600 cursor-pointer bg-gray-50 dark:bg-gray-900 shadow-md px-3 py-2 rounded-md"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeclineLeader(request.email)
                                  }
                                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 cursor-pointer bg-gray-50 dark:bg-gray-900 shadow-md px-3 py-2 rounded-md"
                                >
                                  Decline
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
