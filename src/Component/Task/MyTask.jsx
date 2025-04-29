
// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaLink, FaSearch } from 'react-icons/fa';
// import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
// import { AuthContext } from '../provider/authProvider';
// import TaskCard from '../Task/Task'
// // import {

// //     FaLink,
// //     FaSearch,

// // } from "react-icons/fa";

// const MyTask = () => {
//     const { user } = useContext(AuthContext);
//     const [tasks, setTasks] = useState([]);
//     const [reaction, setReaction] = useState({ likeCount: 0, disLikeCount: 0 });
//     const [activeReaction, setActiveReaction] = useState(null);
//     const [updatingTaskId, setUpdatingTaskId] = useState(null);
//     const [filter, setFilter] = useState("All");
//     const [search, setSearch] = useState("");

//     const filterTasks = () => {
//         return tasks.filter((task) => {
//             const matchesFilter =
//                 filter === "All" ||
//                 (filter === "My Tasks" && task.userId === loggedInUserId) ||
//                 (filter === "Tasks with Attachments" && task.fileUrl) ||
//                 (filter === "Due Today" &&
//                     new Date(task.dueDate).toDateString() ===
//                     new Date().toDateString()) ||
//                 (filter === "Due This Week" &&
//                     new Date(task.dueDate) <=
//                     new Date(new Date().setDate(new Date().getDate() + 7))) ||
//                 (filter === "Completed Tasks" && task.status === "Completed") ||
//                 (filter === "In Progress" && task.status === "In Progress") ||
//                 (filter === "To-Do" && task.status === "To-Do");

//             const matchesSearch =
//                 search === "" ||
//                 task.title.toLowerCase().includes(search.toLowerCase());
//             return matchesFilter && matchesSearch;
//         });
//     };
//     const statusColors = {
//         "To-Do": "bg-gray-400",
//         "In Progress": "bg-yellow-400",
//         "Completed": "bg-green-500",
//     };
//     useEffect(() => {
//         const fetchAssignedTasks = async () => {
//             try {
//                 const { data } = await axios.get(`http://localhost:5000/userassignedtasks/${user?.email}`);

//                 // Each task object includes the outer userTask _id
//                 const taskObjects = data.map(entry => ({
//                     ...entry.task,
//                     userTaskId: entry._id // 👈 attach outer ID
//                 }));

//                 setTasks(taskObjects);
//             } catch (error) {
//                 console.error("Error fetching assigned tasks", error);
//             }
//         };

//         if (user?.email) {
//             fetchAssignedTasks();
//         }
//     }, [user?.email]);


//     const handleReaction = (type) => {
//         setActiveReaction(type);
//         if (type === "like") {
//             setReaction(prev => ({ ...prev, likeCount: prev.likeCount + 1 }));
//         } else {
//             setReaction(prev => ({ ...prev, disLikeCount: prev.disLikeCount + 1 }));
//         }
//     };

//     const handleStatusChange = async (taskId, newStatus) => {
//         try {
//             console.log("Status change initiated for task:", taskId, "New Status:", newStatus);
//             setUpdatingTaskId(taskId);

//             const taskToUpdate = tasks.find((task) => task._id === taskId);
//             console.log("Task to update:", taskToUpdate);

//             if (!taskToUpdate) {
//                 alert("Task not found!");
//                 setUpdatingTaskId(null);
//                 return;
//             }

//             // Count logic
//             let inProgressDelta = 0;
//             let doneDelta = 0;

//             if (newStatus === "In Progress" && taskToUpdate.status !== "In Progress") {
//                 inProgressDelta = 1;
//             } else if (newStatus !== "In Progress" && taskToUpdate.status === "In Progress") {
//                 inProgressDelta = -1;
//             }

//             if (newStatus === "Completed" && taskToUpdate.status !== "Completed") {
//                 doneDelta = 1;
//             } else if (newStatus !== "Completed" && taskToUpdate.status === "Completed") {
//                 doneDelta = -1;
//             }

//             // Prepare the update fields for both collections
//             const updateFields = { status: newStatus };
//             const countOnlyFields = {
//                 inProgressCount: inProgressDelta,
//                 doneCount: doneDelta
//             };

//             // Update UI immediately (local state update)
//             const updatedTasks = tasks.map(task =>
//                 task._id === taskId ? {
//                     ...task,
//                     status: newStatus,
//                     inProgressCount: (task.inProgressCount || 0) + inProgressDelta,
//                     doneCount: (task.doneCount || 0) + doneDelta
//                 } : task
//             );
//             setTasks(updatedTasks);

//             // ✅ Use outer _id for user task collection (updating status)
//             const userTaskRes = await axios.put(`http://localhost:5000/mytasks/${taskToUpdate.userTaskId}`, updateFields);
//             console.log("User task update response:", userTaskRes.data);

//             // 🧠 Use inner _id for task collection (update counts only)
//             const taskRes = await axios.put(`http://localhost:5000/task/${taskId}`, countOnlyFields);
//             console.log("Main task count update response:", taskRes.data);

//         } catch (error) {
//             console.error("Error updating task status:", error);
//             alert("Failed to update task status. Please try again.");
//         } finally {
//             setUpdatingTaskId(null);
//         }
//     };



//     return (
//         <div className="space-y-6 p-4">
//             <div>
//                 <h1 className='text-4xl font-bold'>Welcome to your personal workspace</h1>
//             </div>
//             <div className="flex gap-4 mb-6">
//                 <select
//                     value={filter}
//                     onChange={(e) => setFilter(e.target.value)}
//                     className="p-3 shadow-md rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
//                 >
//                     <option value="All">All Tasks</option>
//                     <option value="My Tasks">My Tasks</option>
//                     <option value="Tasks with Attachments">Tasks with Attachments</option>
//                     <option value="Due Today">Due Today</option>
//                     <option value="Due This Week">Due This Week</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="To-Do">To-Do</option>
//                     <option value="Completed Tasks">Completed Tasks</option>
//                 </select>
//                 <div className="relative w-full">
//                     <input
//                         type="text"
//                         placeholder="Search tasks..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full shadow-md p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
//                     />
//                     <FaSearch className="absolute left-3 top-3 text-gray-400" />
//                 </div>
//             </div>
//             {/* <div className="space-y-4">
//                 {filterTasks().length > 0 ? (
//                     filterTasks().map((task) => (
//                         <TaskCard
//                             key={task.id}
//                             task={task}
//                             loggedInUserId={loggedInUserId}
//                             onDelete={handleDelete}
//                             onEdit={handleEdit}
//                         />
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">No tasks found.</p>
//                 )}
//             </div> */}
//             <div className="space-y-4">
//                 {filterTasks().length > 0 ? (
//                     filterTasks().map((task) => (
//                         <motion.div
//                             key={task._id}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="p-5 bg-white rounded-lg shadow-md border-l-4 transition-all hover:shadow-xl"
//                             style={{ borderColor: statusColors[task.status] || "gray" }}
//                         >
//                             <div className="flex justify-between items-center">
//                                 <h4 className="font-semibold text-lg">{task.title}</h4>
//                                 <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusColors[task.status]} text-white`}>
//                                     {task.status}
//                                 </span>
//                             </div>

//                             <p className="text-gray-600 mt-2">{task.description}</p>
//                             <p className="text-sm text-gray-500 mt-1">
//                                 Due: {new Date(task.dueDate).toLocaleString()}
//                             </p>

//                             {task.fileUrl && (
//                                 <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center mt-2">
//                                     <FaLink className="mr-1" /> View File
//                                 </a>
//                             )}

//                             <div className="mt-2">
//                                 <p>In Progress Count: <strong>{task.inProgressCount}</strong></p>
//                                 <p>Done Count: <strong>{task.doneCount}</strong></p>
//                             </div>

//                             <div className="mt-3">
//                                 <div className="flex items-center space-x-3 text-2xl">
//                                     <FiThumbsUp
//                                         onClick={() => handleReaction("like")}
//                                         className={`cursor-pointer hover:text-gray-500 transition duration-200 ${activeReaction === "like" ? "text-blue-500" : ""}`}
//                                     />
//                                     <FiThumbsDown
//                                         onClick={() => handleReaction("dislike")}
//                                         className={`cursor-pointer hover:text-gray-500 transition duration-200 ${activeReaction === "dislike" ? "text-blue-500" : ""}`}
//                                     />
//                                 </div>
//                                 <p className="text-xs mt-1 text-gray-500">
//                                     {reaction.likeCount} Likes & {reaction.disLikeCount} Dislikes
//                                 </p>
//                             </div>

//                             {updatingTaskId === task._id ? (
//                                 <div className="text-blue-500 text-sm mt-2 animate-pulse">Updating...</div>
//                             ) : (
//                                 <select
//                                     name="status"
//                                     value={task.status}
//                                     onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                                     className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
//                                 >
//                                     <option value="To-Do">To-Do</option>
//                                     <option value="In Progress">In Progress</option>
//                                     <option value="Completed">Completed</option>
//                                 </select>
//                             )}
//                         </motion.div>
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">No tasks found.</p>
//                 )}
//             </div>

//             {tasks.length === 0 ? (
//                 <p className="text-center text-gray-500">No tasks assigned to you yet.</p>
//             ) : (
//                 tasks.map((task) => (
//                     <motion.div
//                         key={task._id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="p-5 bg-white rounded-lg shadow-md border-l-4 transition-all hover:shadow-xl"
//                         style={{ borderColor: statusColors[task.status] || "gray" }}
//                     >
//                         <div className="flex justify-between items-center">
//                             <h4 className="font-semibold text-lg">{task.title}</h4>
//                             <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusColors[task.status]} text-white`}>
//                                 {task.status}
//                             </span>
//                         </div>

//                         <p className="text-gray-600 mt-2">{task.description}</p>
//                         <p className="text-sm text-gray-500 mt-1">
//                             Due: {new Date(task.dueDate).toLocaleString()}
//                         </p>

//                         {task.fileUrl && (
//                             <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center mt-2">
//                                 <FaLink className="mr-1" /> View File
//                             </a>
//                         )}

//                         <div className="mt-2">
//                             <p>In Progress Count: <strong>{task.inProgressCount}</strong></p>
//                             <p>Done Count: <strong>{task.doneCount}</strong></p>
//                         </div>

//                         <div className="mt-3">
//                             <div className="flex items-center space-x-3 text-2xl">
//                                 <FiThumbsUp
//                                     onClick={() => handleReaction("like")}
//                                     className={`cursor-pointer hover:text-gray-500 transition duration-200 ${activeReaction === "like" ? "text-blue-500" : ""}`}
//                                 />
//                                 <FiThumbsDown
//                                     onClick={() => handleReaction("dislike")}
//                                     className={`cursor-pointer hover:text-gray-500 transition duration-200 ${activeReaction === "dislike" ? "text-blue-500" : ""}`}
//                                 />
//                             </div>
//                             <p className="text-xs mt-1 text-gray-500">
//                                 {reaction.likeCount} Likes & {reaction.disLikeCount} Dislikes
//                             </p>
//                         </div>
//                         {updatingTaskId === task._id ? (
//                             <div className="text-blue-500 text-sm mt-2 animate-pulse">Updating...</div>
//                         ) : (
//                             <select
//                                 name="status"
//                                 value={task.status}
//                                 onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                                 className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
//                             >
//                                 <option value="To-Do">To-Do</option>
//                                 <option value="In Progress">In Progress</option>
//                                 <option value="Completed">Completed</option>
//                             </select>
//                         )}
//                     </motion.div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default MyTask;



// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaLink, FaSearch } from 'react-icons/fa';
// import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
// import { AuthContext } from '../provider/authProvider';

// const MyTask = () => {
//     const { user } = useContext(AuthContext);
//     const [tasks, setTasks] = useState([]);
//     const [reaction, setReaction] = useState({ likeCount: 0, disLikeCount: 0 });
//     const [activeReaction, setActiveReaction] = useState(null);
//     const [updatingTaskId, setUpdatingTaskId] = useState(null);
//     const [filter, setFilter] = useState("All");
//     const [search, setSearch] = useState("");

//     const loggedInUserId = user?.uid;

//     const filterTasks = () => {
//         return tasks.filter((task) => {
//             const matchesFilter =
//                 filter === "All" ||
//                 (filter === "My Tasks" && task.userId === loggedInUserId) ||
//                 (filter === "Tasks with Attachments" && task.fileUrl) ||
//                 (filter === "Due Today" &&
//                     new Date(task.dueDate).toDateString() === new Date().toDateString()) ||
//                 (filter === "Due This Week" &&
//                     new Date(task.dueDate) <= new Date(new Date().setDate(new Date().getDate() + 7))) ||
//                 (filter === "Completed Tasks" && task.status === "Completed") ||
//                 (filter === "In Progress" && task.status === "In Progress") ||
//                 (filter === "To-Do" && task.status === "To-Do");

//             const matchesSearch =
//                 search === "" || task.title.toLowerCase().includes(search.toLowerCase());

//             return matchesFilter && matchesSearch;
//         });
//     };

//     const statusColors = {
//         "To-Do": "bg-gray-400",
//         "In Progress": "bg-yellow-400",
//         "Completed": "bg-green-500",
//     };

//     useEffect(() => {
//         const fetchAssignedTasks = async () => {
//             try {
//                 const { data } = await axios.get(`http://localhost:5000/userassignedtasks/${user?.email}`);
//                 const taskObjects = data.map(entry => ({
//                     ...entry.task,
//                     userTaskId: entry._id
//                 }));
//                 setTasks(taskObjects);
//             } catch (error) {
//                 console.error("Error fetching assigned tasks", error);
//             }
//         };

//         if (user?.email) {
//             fetchAssignedTasks();
//         }
//     }, [user?.email]);

//     const handleReaction = (type) => {
//         setActiveReaction(type);
//         setReaction(prev => ({
//             ...prev,
//             likeCount: type === "like" ? prev.likeCount + 1 : prev.likeCount,
//             disLikeCount: type === "dislike" ? prev.disLikeCount + 1 : prev.disLikeCount,
//         }));
//     };

//     const handleStatusChange = async (taskId, newStatus) => {
//         try {
//             setUpdatingTaskId(taskId);

//             const taskToUpdate = tasks.find((task) => task._id === taskId);
//             if (!taskToUpdate) {
//                 alert("Task not found!");
//                 setUpdatingTaskId(null);
//                 return;
//             }

//             let inProgressDelta = 0;
//             let doneDelta = 0;

//             if (newStatus === "In Progress" && taskToUpdate.status !== "In Progress") {
//                 inProgressDelta = 1;
//             } else if (newStatus !== "In Progress" && taskToUpdate.status === "In Progress") {
//                 inProgressDelta = -1;
//             }

//             if (newStatus === "Completed" && taskToUpdate.status !== "Completed") {
//                 doneDelta = 1;
//             } else if (newStatus !== "Completed" && taskToUpdate.status === "Completed") {
//                 doneDelta = -1;
//             }

//             const updateFields = { status: newStatus };
//             const countOnlyFields = {
//                 inProgressCount: inProgressDelta,
//                 doneCount: doneDelta
//             };

//             const updatedTasks = tasks.map(task =>
//                 task._id === taskId
//                     ? {
//                         ...task,
//                         status: newStatus,
//                         inProgressCount: (task.inProgressCount || 0) + inProgressDelta,
//                         doneCount: (task.doneCount || 0) + doneDelta,
//                     }
//                     : task
//             );
//             setTasks(updatedTasks);

//             await axios.put(`http://localhost:5000/mytasks/${taskToUpdate.userTaskId}`, updateFields);
//             await axios.put(`http://localhost:5000/task/${taskId}`, countOnlyFields);

//         } catch (error) {
//             console.error("Error updating task status:", error);
//             alert("Failed to update task status. Please try again.");
//         } finally {
//             setUpdatingTaskId(null);
//         }
//     };

//     const filteredTasks = filterTasks();

//     return (
//         <div className="space-y-6 p-4">
//             <h1 className='text-4xl font-bold'>Welcome to your personal workspace</h1>

//             <div className="flex gap-4 mb-6">
//                 <select
//                     value={filter}
//                     onChange={(e) => setFilter(e.target.value)}
//                     className="p-3 shadow-md rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
//                 >
//                     <option value="All">All Tasks</option>
//                     <option value="My Tasks">My Tasks</option>
//                     <option value="Tasks with Attachments">Tasks with Attachments</option>
//                     <option value="Due Today">Due Today</option>
//                     <option value="Due This Week">Due This Week</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="To-Do">To-Do</option>
//                     <option value="Completed Tasks">Completed Tasks</option>
//                 </select>

//                 <div className="relative w-full">
//                     <input
//                         type="text"
//                         placeholder="Search tasks..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full shadow-md p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
//                     />
//                     <FaSearch className="absolute left-3 top-3 text-gray-400" />
//                 </div>
//             </div>

//             <div className="space-y-4">
//                 {filteredTasks.length > 0 ? (
//                     filteredTasks.map((task) => (
//                         <motion.div
//                             key={task._id}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="p-5 bg-white rounded-lg shadow-md border-l-4 transition-all hover:shadow-xl"
//                             style={{ borderColor: statusColors[task.status] || "gray" }}
//                         >
//                             <div className="flex justify-between items-center">
//                                 <h4 className="font-semibold text-lg">{task.title}</h4>
//                                 <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusColors[task.status]} text-white`}>
//                                     {task.status}
//                                 </span>
//                             </div>

//                             <p className="text-gray-600 mt-2">{task.description}</p>
//                             <p className="text-sm text-gray-500 mt-1">
//                                 Due: {new Date(task.dueDate).toLocaleString()}
//                             </p>

//                             {task.fileUrl && (
//                                 <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center mt-2">
//                                     <FaLink className="mr-1" /> View File
//                                 </a>
//                             )}

//                             <div className="mt-2">
//                                 <p>In Progress Count: <strong>{task.inProgressCount}</strong></p>
//                                 <p>Done Count: <strong>{task.doneCount}</strong></p>
//                             </div>

//                             <div className="mt-3">
//                                 <div className="flex items-center space-x-3 text-2xl">
//                                     <FiThumbsUp
//                                         onClick={() => handleReaction("like")}
//                                         className={`cursor-pointer hover:text-gray-500 transition duration-200 ${activeReaction === "like" ? "text-blue-500" : ""}`}
//                                     />
//                                     <FiThumbsDown
//                                         onClick={() => handleReaction("dislike")}
//                                         className={`cursor-pointer hover:text-gray-500 transition duration-200 ${activeReaction === "dislike" ? "text-blue-500" : ""}`}
//                                     />
//                                 </div>
//                                 <p className="text-xs mt-1 text-gray-500">
//                                     {reaction.likeCount} Likes & {reaction.disLikeCount} Dislikes
//                                 </p>
//                             </div>

//                             {updatingTaskId === task._id ? (
//                                 <div className="text-blue-500 text-sm mt-2 animate-pulse">Updating...</div>
//                             ) : (
//                                 <select
//                                     name="status"
//                                     value={task.status}
//                                     onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                                     className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
//                                 >
//                                     <option value="To-Do">To-Do</option>
//                                     <option value="In Progress">In Progress</option>
//                                     <option value="Completed">Completed</option>
//                                 </select>
//                             )}
//                         </motion.div>
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">No tasks found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyTask;

// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { FaLink, FaSearch } from 'react-icons/fa';
// import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
// import { AuthContext } from '../provider/authProvider';

// const MyTask = () => {
//     const { user } = useContext(AuthContext);
//     const [tasks, setTasks] = useState([]);
//     const [reaction, setReaction] = useState({ likeCount: 0, disLikeCount: 0 });
//     const [activeReaction, setActiveReaction] = useState(null);
//     const [updatingTaskId, setUpdatingTaskId] = useState(null);
//     const [filter, setFilter] = useState("All");
//     const [search, setSearch] = useState("");

//     const loggedInUserId = user?.uid;

//     const filterTasks = () => {
//         return tasks.filter((task) => {
//             const matchesFilter =
//                 filter === "All" ||
//                 (filter === "My Tasks" && task.userId === loggedInUserId) ||
//                 (filter === "Tasks with Attachments" && task.fileUrl) ||
//                 (filter === "Due Today" &&
//                     new Date(task.dueDate).toDateString() === new Date().toDateString()) ||
//                 (filter === "Due This Week" &&
//                     new Date(task.dueDate) <= new Date(new Date().setDate(new Date().getDate() + 7))) ||
//                 (filter === "Completed Tasks" && task.status === "Completed") ||
//                 (filter === "In Progress" && task.status === "In Progress") ||
//                 (filter === "To-Do" && task.status === "To-Do");

//             const matchesSearch =
//                 search === "" || task.title.toLowerCase().includes(search.toLowerCase());

//             return matchesFilter && matchesSearch;
//         });
//     };

//     const statusColors = {
//         "To-Do": "bg-gray-500",
//         "In Progress": "bg-yellow-500",
//         "Completed": "bg-green-500",
//     };

//     useEffect(() => {
//         const fetchAssignedTasks = async () => {
//             try {
//                 const { data } = await axios.get(`http://localhost:5000/userassignedtasks/${user?.email}`);
//                 const taskObjects = data.map(entry => ({
//                     ...entry.task,
//                     userTaskId: entry._id
//                 }));
//                 setTasks(taskObjects);
//             } catch (error) {
//                 console.error("Error fetching assigned tasks", error);
//             }
//         };

//         if (user?.email) {
//             fetchAssignedTasks();
//         }
//     }, [user?.email]);

//     const handleReaction = (type) => {
//         setActiveReaction(type);
//         setReaction(prev => ({
//             ...prev,
//             likeCount: type === "like" ? prev.likeCount + 1 : prev.likeCount,
//             disLikeCount: type === "dislike" ? prev.disLikeCount + 1 : prev.disLikeCount,
//         }));
//     };

//     const handleStatusChange = async (taskId, newStatus) => {
//         try {
//             setUpdatingTaskId(taskId);
//             const taskToUpdate = tasks.find((task) => task._id === taskId);
//             if (!taskToUpdate) return;

//             let inProgressDelta = 0;
//             let doneDelta = 0;

//             if (newStatus === "In Progress" && taskToUpdate.status !== "In Progress") inProgressDelta = 1;
//             else if (newStatus !== "In Progress" && taskToUpdate.status === "In Progress") inProgressDelta = -1;

//             if (newStatus === "Completed" && taskToUpdate.status !== "Completed") doneDelta = 1;
//             else if (newStatus !== "Completed" && taskToUpdate.status === "Completed") doneDelta = -1;

//             const updateFields = { status: newStatus };
//             const countOnlyFields = { inProgressCount: inProgressDelta, doneCount: doneDelta };

//             const updatedTasks = tasks.map(task =>
//                 task._id === taskId
//                     ? {
//                         ...task,
//                         status: newStatus,
//                         inProgressCount: (task.inProgressCount || 0) + inProgressDelta,
//                         doneCount: (task.doneCount || 0) + doneDelta,
//                     }
//                     : task
//             );
//             setTasks(updatedTasks);

//             await axios.put(`http://localhost:5000/mytasks/${taskToUpdate.userTaskId}`, updateFields);
//             await axios.put(`http://localhost:5000/task/${taskId}`, countOnlyFields);
//         } catch (error) {
//             console.error("Error updating task status:", error);
//         } finally {
//             setUpdatingTaskId(null);
//         }
//     };

//     const filteredTasks = filterTasks();

//     return (
//         <div className="space-y-8 p-6 md:p-10 bg-gradient-to-tr from-blue-50 to-white min-h-screen">
//             <h1 className='text-4xl font-bold text-center text-gray-800'>📝 My Task Dashboard</h1>

//             <div className="flex flex-col md:flex-row gap-4 items-center">
//                 <select
//                     value={filter}
//                     onChange={(e) => setFilter(e.target.value)}
//                     className="w-full md:w-1/3 p-3 shadow-md rounded-md focus:ring-2 focus:ring-blue-400 transition-all bg-white"
//                 >
//                     <option value="All">All Tasks</option>
//                     <option value="My Tasks">My Tasks</option>
//                     <option value="Tasks with Attachments">Tasks with Attachments</option>
//                     <option value="Due Today">Due Today</option>
//                     <option value="Due This Week">Due This Week</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="To-Do">To-Do</option>
//                     <option value="Completed Tasks">Completed Tasks</option>
//                 </select>

//                 <div className="relative w-full md:w-2/3">
//                     <input
//                         type="text"
//                         placeholder="🔍 Search tasks..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full shadow-md p-3 pl-12 rounded-md focus:ring-2 focus:ring-blue-400 transition-all bg-white"
//                     />
//                     <FaSearch className="absolute left-4 top-4 text-gray-400" />
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {filteredTasks.length > 0 ? (
//                     filteredTasks.map((task) => (
//                         <motion.div
//                             key={task._id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             whileHover={{ scale: 1.02 }}
//                             className="p-6 backdrop-blur-md bg-white/70 rounded-2xl shadow-lg border border-gray-200 transition-all"
//                         >
//                             <div className="flex justify-between items-center mb-2">
//                                 <h4 className="text-xl font-semibold text-gray-800">{task.title}</h4>
//                                 <span className={`text-xs px-3 py-1 rounded-full ${statusColors[task.status]} text-white font-bold`}>
//                                     {task.status}
//                                 </span>
//                             </div>

//                             <p className="text-gray-700">{task.description}</p>
//                             <p className="text-sm text-gray-500 mt-2">
//                                 ⏰ Due: {new Date(task.dueDate).toLocaleString()}
//                             </p>

//                             {task.fileUrl && (
//                                 <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 inline-block">
//                                     <FaLink className="inline-block mr-1" /> View Attachment
//                                 </a>
//                             )}

//                             <div className="mt-3 text-sm">
//                                 <p>🛠 In Progress: <strong>{task.inProgressCount}</strong></p>
//                                 <p>✅ Done: <strong>{task.doneCount}</strong></p>
//                             </div>

//                             <div className="mt-4 flex items-center gap-4 text-xl">
//                                 <div title="Like Task">
//                                     <FiThumbsUp
//                                         onClick={() => handleReaction("like")}
//                                         className={`cursor-pointer hover:text-green-500 transition ${activeReaction === "like" && "text-green-600"}`}
//                                     />
//                                 </div>
//                                 <div title="Dislike Task">
//                                     <FiThumbsDown
//                                         onClick={() => handleReaction("dislike")}
//                                         className={`cursor-pointer hover:text-red-500 transition ${activeReaction === "dislike" && "text-red-600"}`}
//                                     />
//                                 </div>
//                             </div>
//                             <p className="text-xs mt-1 text-gray-400">
//                                 👍 {reaction.likeCount} | 👎 {reaction.disLikeCount}
//                             </p>

//                             <div className="mt-4">
//                                 {updatingTaskId === task._id ? (
//                                     <div className="text-blue-500 text-sm animate-pulse">Updating status...</div>
//                                 ) : (
//                                     <select
//                                         value={task.status}
//                                         onChange={(e) => handleStatusChange(task._id, e.target.value)}
//                                         className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
//                                     >
//                                         <option value="To-Do">To-Do</option>
//                                         <option value="In Progress">In Progress</option>
//                                         <option value="Completed">Completed</option>
//                                     </select>
//                                 )}
//                             </div>
//                         </motion.div>
//                     ))
//                 ) : (
//                     <p className="col-span-full text-center text-gray-500">No tasks found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyTask;
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLink, FaSearch, FaThumbtack } from 'react-icons/fa';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { AuthContext } from '../provider/authProvider';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [reaction, setReaction] = useState({ likeCount: 0, disLikeCount: 0 });
    const [activeReaction, setActiveReaction] = useState(null);
    const [updatingTaskId, setUpdatingTaskId] = useState(null);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [pinnedTasks, setPinnedTasks] = useState({});

    const loggedInUserId = user?.uid;

    const filterTasks = () => {
        const filtered = tasks.filter((task) => {
            const matchesFilter =
                filter === "All" ||
                (filter === "My Tasks" && task.userId === loggedInUserId) ||
                (filter === "Tasks with Attachments" && task.fileUrl) ||
                (filter === "Due Today" &&
                    new Date(task.dueDate).toDateString() === new Date().toDateString()) ||
                (filter === "Due This Week" &&
                    new Date(task.dueDate) <= new Date(new Date().setDate(new Date().getDate() + 7))) ||
                (filter === "Completed Tasks" && task.status === "Completed") ||
                (filter === "In Progress" && task.status === "In Progress") ||
                (filter === "To-Do" && task.status === "To-Do");

            const matchesSearch =
                search === "" || task.title.toLowerCase().includes(search.toLowerCase());

            return matchesFilter && matchesSearch;
        });

        // Sort pinned tasks to the top
        return filtered.sort((a, b) => {
            const aPinned = pinnedTasks[a._id] ? 1 : 0;
            const bPinned = pinnedTasks[b._id] ? 1 : 0;
            return bPinned - aPinned;
        });
    };

    const statusColors = {
        "To-Do": "bg-gray-500",
        "In Progress": "bg-yellow-500",
        "Completed": "bg-green-500",
    };

    // useEffect(() => {
    //     const fetchAssignedTasks = async () => {
    //         try {
    //             const { data } = await axios.get(`http://localhost:5000/userassignedtasks/${user?.email}`);
    //             const taskObjects = data.map(entry => ({
    //                 ...entry.task,
    //                 userTaskId: entry._id
    //             }));
    //             setTasks(taskObjects);
    //         } catch (error) {
    //             console.error("Error fetching assigned tasks", error);
    //         }
    //     };

    //     if (user?.email) {
    //         fetchAssignedTasks();
    //     }
    // }, [user?.email]);

    useEffect(() => {
        const fetchAssignedTasks = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/userassignedtasks/${user?.email}`);
                const taskObjects = data.map(entry => {
                    if (entry.pinned) {
                        setPinnedTasks(prev => ({
                            ...prev,
                            [entry.task._id]: true
                        }));
                    }
                    return {
                        ...entry.task,
                        userTaskId: entry._id
                    };
                });
                setTasks(taskObjects);
            } catch (error) {
                console.error("Error fetching assigned tasks", error);
            }
        };

        if (user?.email) {
            fetchAssignedTasks();
        }
    }, [user?.email]);

    const handleReaction = (type) => {
        setActiveReaction(type);
        setReaction(prev => ({
            ...prev,
            likeCount: type === "like" ? prev.likeCount + 1 : prev.likeCount,
            disLikeCount: type === "dislike" ? prev.disLikeCount + 1 : prev.disLikeCount,
        }));
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            setUpdatingTaskId(taskId);
            const taskToUpdate = tasks.find((task) => task._id === taskId);
            if (!taskToUpdate) return;

            let inProgressDelta = 0;
            let doneDelta = 0;

            if (newStatus === "In Progress" && taskToUpdate.status !== "In Progress") inProgressDelta = 1;
            else if (newStatus !== "In Progress" && taskToUpdate.status === "In Progress") inProgressDelta = -1;

            if (newStatus === "Completed" && taskToUpdate.status !== "Completed") doneDelta = 1;
            else if (newStatus !== "Completed" && taskToUpdate.status === "Completed") doneDelta = -1;

            const updateFields = { status: newStatus };
            const countOnlyFields = { inProgressCount: inProgressDelta, doneCount: doneDelta };

            const updatedTasks = tasks.map(task =>
                task._id === taskId
                    ? {
                        ...task,
                        status: newStatus,
                        inProgressCount: (task.inProgressCount || 0) + inProgressDelta,
                        doneCount: (task.doneCount || 0) + doneDelta,
                    }
                    : task
            );
            setTasks(updatedTasks);

            await axios.put(`http://localhost:5000/mytasks/${taskToUpdate.userTaskId}`, updateFields);
            await axios.put(`http://localhost:5000/task/${taskId}`, countOnlyFields);
        } catch (error) {
            console.error("Error updating task status:", error);
        } finally {
            setUpdatingTaskId(null);
        }
    };

    const togglePinTask = async (taskId) => {
        const newPinnedState = !pinnedTasks[taskId];

        setPinnedTasks(prev => ({
            ...prev,
            [taskId]: newPinnedState,
        }));

        try {
            await axios.post("http://localhost:5000/pin-task", {
                taskId,
                email: user?.email,
                pinned: newPinnedState
            });
        } catch (error) {
            console.error("Failed to update pin state:", error);
        }
    };


    const filteredTasks = filterTasks();

    return (
        <div className="space-y-8 p-6 md:p-10 bg-gradient-to-tr from-blue-50 to-white min-h-screen">
            <h1 className='text-4xl font-bold text-center text-gray-800'>📝 Welcome to your personal workplace</h1>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full md:w-1/3 p-3 shadow-md rounded-md focus:ring-2 focus:ring-blue-400 transition-all bg-white"
                >
                    <option value="All">All Tasks</option>
                    <option value="My Tasks">My Tasks</option>
                    <option value="Tasks with Attachments">Tasks with Attachments</option>
                    <option value="Due Today">Due Today</option>
                    <option value="Due This Week">Due This Week</option>
                    <option value="In Progress">In Progress</option>
                    <option value="To-Do">To-Do</option>
                    <option value="Completed Tasks">Completed Tasks</option>
                </select>

                <div className="relative w-full md:w-2/3">
                    <input
                        type="text"
                        placeholder="🔍 Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full shadow-md p-3 pl-12 rounded-md focus:ring-2 focus:ring-blue-400 transition-all bg-white"
                    />
                    <FaSearch className="absolute left-4 top-4 text-gray-400" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <motion.div
                            key={task._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            className="p-6 backdrop-blur-md bg-white/70 rounded-2xl shadow-lg border border-gray-200 transition-all"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-xl font-semibold text-gray-800">{task.title}</h4>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-3 py-1 rounded-full ${statusColors[task.status]} text-white font-bold`}>
                                        {task.status}
                                    </span>
                                    <FaThumbtack
                                        onClick={() => togglePinTask(task._id)}
                                        className={`cursor-pointer transition text-gray-500 hover:text-yellow-500 ${pinnedTasks[task._id] ? "text-yellow-600 rotate-45" : ""
                                            }`}
                                        title={pinnedTasks[task._id] ? "Unpin Task" : "Pin Task"}
                                    />
                                </div>
                            </div>

                            <p className="text-gray-700">{task.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                ⏰ Due: {new Date(task.dueDate).toLocaleString()}
                            </p>

                            {task.fileUrl && (
                                <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 inline-block">
                                    <FaLink className="inline-block mr-1" /> View Attachment
                                </a>
                            )}

                            <div className="mt-3 text-sm">
                                <p>🛠 In Progress: <strong>{task.inProgressCount}</strong></p>
                                <p>✅ Done: <strong>{task.doneCount}</strong></p>
                            </div>

                            <div className="mt-4 flex items-center gap-4 text-xl">
                                <div title="Like Task">
                                    <FiThumbsUp
                                        onClick={() => handleReaction("like")}
                                        className={`cursor-pointer hover:text-green-500 transition ${activeReaction === "like" && "text-green-600"}`}
                                    />
                                </div>
                                <div title="Dislike Task">
                                    <FiThumbsDown
                                        onClick={() => handleReaction("dislike")}
                                        className={`cursor-pointer hover:text-red-500 transition ${activeReaction === "dislike" && "text-red-600"}`}
                                    />
                                </div>
                            </div>
                            <p className="text-xs mt-1 text-gray-400">
                                👍 {reaction.likeCount} | 👎 {reaction.disLikeCount}
                            </p>

                            <div className="mt-4">
                                {updatingTaskId === task._id ? (
                                    <div className="text-blue-500 text-sm animate-pulse">Updating status...</div>
                                ) : (
                                    <select
                                        value={task.status}
                                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                        className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-300 transition"
                                    >
                                        <option value="To-Do">To-Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                )}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default MyTask;
