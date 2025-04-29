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
//       fetch(`https://team-management-tools-server-side.onrender.com/profileInfo/${user.email}`)
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
//         .get(`https://team-management-tools-server-side.onrender.com/profileInfo/${user?.email}`)
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
//       fetch("https://team-management-tools-server-side.onrender.com/leaderRequests")
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
//         const response = await fetch("https://team-management-tools-server-side.onrender.com/requestLeader", {
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
//         `https://team-management-tools-server-side.onrender.com/profile/${user?.email}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(profileInfo),
//         }
//       );

//       const data = await response.json();

//       if (response.ok && data.message === "profile updated successfully!") {
//         const updatedRes = await fetch(
//           `https://team-management-tools-server-side.onrender.com/profileInfo/${user.email}`
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
//       const res = await fetch(`https://team-management-tools-server-side.onrender.com/approveLeader/${email}`, {
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

//         await axios.patch(`https://team-management-tools-server-side.onrender.com/user/${user?.email}`, {
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
  const [userRole, setuserRole] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [requestSent, setRequestSent] = useState("")
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    portfolio: "",
    github: "",
  });
  const [requests, setRequests] = useState([]);


  useEffect(() => {
    if (user?.email) {
      fetch(`https://team-management-tools-server-side.onrender.com/profileInfo/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const userData = data?.[0] || {};
          setUserData(userData);
          setStatus(userData?.status);
          setuserRole(userData?.role || "not set yet");
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
        .get(`https://team-management-tools-server-side.onrender.com/profileInfo/${user?.email}`)
        .then((res) => {
          const userData = res.data?.[0];
          setuserRole(userData?.userRole);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email]);


  useEffect(() => {
    if (userRole === "admin") {
      fetch("https://team-management-tools-server-side.onrender.com/leaderRequests")
        .then((res) => res.json())
        .then((data) => setRequests(data))
        .catch((err) => console.error("Error fetching leader requests:", err));
    }
  }, [userRole]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "bio") setBio(value);
    else if (name === "role") setuserRole(value);
    else if (name === "location") setLocation(value);
    else if (name === "status") setStatus(value);
    else setSocialLinks({ ...socialLinks, [name]: value });
  };


  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);


    const profileInfo = { bio, userRole, location, socialLinks, status };


    try {
      // If user is trying to set userRole to group leader (but is not already group leader/admin), request approval instead
      if (
        userRole === "group leader" &&
        userData.userRole !== "group leader" &&
        userData.userRole !== "admin"
      ) {
        const response = await fetch("https://team-management-tools-server-side.onrender.com/requestLeader", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: user.displayName, email: user.email }),
        });


        const result = await response.json();


        if (response.ok) {
          toast.success("Leader request sent to admin", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error(result.message || "Request failed", {
            position: "top-right",
            autoClose: 5000,
          });
        }

        return;
      }


      const response = await fetch(
        `https://team-management-tools-server-side.onrender.com/profile/${user?.email}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileInfo),
        }
      );


      const data = await response.json();


      if (response.ok && data.message === "profile updated successfully!") {
        const updatedRes = await fetch(
          `https://team-management-tools-server-side.onrender.com/profileInfo/${user.email}`
        );
        const updatedProfile = await updatedRes.json();
        const updatedUserData = updatedProfile?.[0] || {};

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




        toast.success("Info updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error(data.status === 400 || "Failed to update info", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log("Error during fetch:", error);
    }
  };
  // req for group leader to db
  const handleRequestGroupLeader = async () => {
    try {
      const res = await fetch("https://team-management-tools-server-side.onrender.com/groupLeaderRequest", {
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
    setRequests(prev =>
      prev.map(req =>
        req.email === email ? { ...req, status: "approved" } : req
      )
    );

    try {
      const res = await fetch(`https://team-management-tools-server-side.onrender.com/approveLeader/${email}`, {
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
    setRequests(prev =>
      prev.map(req =>
        req.email === email ? { ...req, status: "declined" } : req
      )
    );

    try {
      const res = await fetch(`https://team-management-tools-server-side.onrender.com/declineLeader/${email}`, {
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

  const [image, setImage] = useState(user?.photoURL || userData?.userImage);
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_ImgBB_Key}`,
        formData
      );

      if (data.success) {
        const image_url = data.data.display_url;
        toast.success("Image uploaded successfully");

        await axios.patch(`https://team-management-tools-server-side.onrender.com/user/${user?.email}`, {
          image: image_url,
        });

        setImage(image_url);
      }
    } catch (error) {
      console.error("Error uploading or updating image:", error);
      toast.error("Something went wrong while updating the image.");
    }
  };

  return (
    <div className="md:w-8/10 mx-auto pb-10 bg-amber-50 md:my-10 md:rounded-xl flex flex-col gap-8 shadow-xl">
      {/* Profile Header */}
      <div>
        <div className="w-full lg:h-[300px] md:h-[250px] h-[150px] relative">
          <img
            src="https://c4.wallpaperflare.com/wallpaper/55/890/455/artwork-nature-landscape-fantasy-art-fire-trees-lava-cherry-blossom-clouds-smoke-digital-art-fightstar-album-covers-wallpaper-preview.jpg"
            className="w-full h-full object-cover md:rounded-tl-xl md:rounded-tr-xl"
            alt="Banner"
          />
        </div>
        <div className="lg:w-[150px] md:w-[110px] md:h-[110px] lg:h-[150px] w-[80px] h-[80px] -translate-y-[150%] translate-x-[40%] absolute">
          <img
            src={
              image ||
              "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg"
            }
            className={`w-full h-full rounded-full ring-2 shadow-2xl drop-shadow-2xl ${userData?.status === "Available"
              ? "ring-green-500"
              : userData?.status === "Busy"
                ? "ring-yellow-500"
                : userData?.status === "Unavailable"
                  ? "ring-red-500"
                  : "ring-white"
              }`}
            alt="Profile"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="absolute lg:top-4 top-1 md:right-1 -right-2 lg:right-1 bg-gray-300 rounded-full p-1 cursor-pointer">
            <IoCameraReverseOutline
              onClick={() => document.getElementById("image").click()}
              className="text-gray-900 text-xl"
            />
          </div>
        </div>
      </div>


      {/* Profile Content */}
      <div className="lg:w-7/12 md:w-9/12 w-full mx-auto md:pl-3 px-5 md:px-0">
        <div className="flex md:flex-row justify-between items-center">
          <p className="text-black capitalize font-bold text-3xl">
            {user ? user.displayName : "N/A"}
          </p>
          {!isEditable ? (
            <p className="text-black font-semibold text-sm">
              {status || "Available"}
            </p>
          ) : (
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-1 border border-gray-300 rounded-md font-semibold text-xs"
            >
              <option value="">Your Status</option>
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          )}
        </div>


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
                className="py-1 rounded-lg border-2 border-gray-300 px-2 text-gray-500 font-bold"
              />
            </div>
          </div>
        )}


        <form onSubmit={handleUpdateProfile}>
          <div className="flex md:flex-row flex-col gap-6 mt-6">
            {/* About Section */}
            <div className="md:w-1/2 w-full">
              <h1 className="font-bold text-xl text-gray-600 mb-3">
                About Yourself
              </h1>
              <div className="flex flex-col gap-3">
                {/* Role Dropdown */}
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-black text-sm">Role:</p>
                  {/* {isEditable ? (
                    <select
                      name="role"
                      value={role}
                      onChange={handleInputChange}
                      disabled={role === "admin"}
                      className="border-2 border-gray-300 py-1 px-3 rounded-lg text-gray-500 font-bold"
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="group leader">Leader</option>
                      <option value="member">Member</option>
                    </select>
                  ) : ( */}
                  <p className="text-black font-semibold text-sm">
                    {userRole || "Not set"}
                  </p>
                  {/* )} */}
                  {/* {userRole !== "group leader" && !requestSent && ( */}
                  {/* {userRole !== "group leader" && !requestSent && (

                                        <button
                                            onClick={handleRequestGroupLeader}
                                            className="btn btn-warning mt-4"
                                        >
                                            Request to become a Group Leader
                                        </button>
                                    )} */}

                  <div className="flex flex-col gap-1">
                    {/* <p className="font-bold text-black text-sm">Role:</p>
                                        <p className="text-black font-semibold text-sm">
                                            {userRole || "Not set"}
                                        </p> */}
                    {userRole === "admin" && (
                      <>
                        <button
                          type="button"
                          disabled
                          className="btn btn-warning mt-4 opacity-50 cursor-not-allowed"
                        >
                          Request to become a Group Leader
                        </button>
                        <p className="text-gray-600 text-sm mt-2">You are an Admin</p>
                      </>
                    )}
                    {userRole === "group leader" && (
                      <>
                        <button
                          type="button"
                          disabled
                          className="btn btn-warning mt-4 opacity-50 cursor-not-allowed"
                        >
                          Request to become a Group Leader
                        </button>
                        <p className="text-gray-600 text-sm mt-2">You are a Group Leader</p>
                      </>
                    )}
                    {userRole !== "admin" &&
                      userRole !== "group leader" &&
                      !requestSent && (
                        <button
                          type="button"
                          onClick={handleRequestGroupLeader}
                          className="btn btn-warning mt-4"
                        >
                          Request to become a Group Leader
                        </button>
                      )}
                  </div>

                </div>


                {/* Location */}
                <div className="flex flex-col gap-1">
                  <p className="font-bold text-black text-sm">Location:</p>
                  <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    className="border-2 border-gray-300 py-1 px-3 rounded-lg text-gray-500 font-bold"
                  />
                </div>
              </div>
            </div>


            {/* Social Media */}
            <div className="md:w-1/2 w-full">
              <h1 className="font-bold text-lg text-gray-600 mb-3">
                Social Media Profiles
              </h1>
              <div className="flex flex-col gap-3">
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
                    <div className="absolute right-3 top-2 text-black text-lg">
                      {icon}
                    </div>
                    {isEditable ? (
                      <input
                        type="text"
                        name={platform}
                        value={socialLinks[platform]}
                        onChange={handleInputChange}
                        placeholder={`Enter your ${label} link`}
                        className="border-2 border-gray-300 py-1 px-3 rounded-lg text-gray-500 font-bold w-full"
                      />
                    ) : (
                      <a
                        href={socialLinks[platform] || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-gray-300 py-1 px-3 rounded-lg text-gray-500 font-bold w-full block"
                      >
                        {socialLinks[platform] || `Enter your ${label} link`}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Save/Edit Button */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-8 py-2 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md transition duration-500 hover:bg-blue-700"
            >
              {isEditable ? "Save" : "Edit"}
            </button>
          </div>
        </form>


        {/* Admin Role - Leader Requests Table */}
        {/* Admin Role - Leader Requests Table */}
        {userRole === "admin" && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-center text-blue-700 mb-4">
              Group Leader Requests
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-700 text-sm uppercase">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request._id} className="text-center">
                      <td className="px-4 py-2">{request.name}</td>
                      <td className="px-4 py-2">{request.email}</td>
                      <td className="px-4 py-2">
                        {request.status === "approved" ? (
                          <span className="text-green-600 font-semibold">Approved</span>
                        ) : request.status === "declined" ? (
                          <span className="text-red-600 font-semibold">Declined</span>
                        ) : (
                          <>
                            <button onClick={() => handleApproveLeader(request.email)} className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded mr-2">Approve</button>
                            <button onClick={() => handleDeclineLeader(request.email)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">Decline</button>
                          </>
                        )}

                      </td>

                    </tr>
                  ))}
                  {requests.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-gray-500 py-4 text-center">
                        No group leader requests
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div >
  );
};


export default Profile;