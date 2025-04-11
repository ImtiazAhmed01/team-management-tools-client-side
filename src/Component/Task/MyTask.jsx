
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLink } from 'react-icons/fa';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { AuthContext } from '../provider/authProvider';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [reaction, setReaction] = useState({ likeCount: 0, disLikeCount: 0 });
    const [activeReaction, setActiveReaction] = useState(null);
    const [updatingTaskId, setUpdatingTaskId] = useState(null);


    const statusColors = {
        "To-Do": "bg-gray-400",
        "In Progress": "bg-yellow-400",
        "Completed": "bg-green-500",
    };
    useEffect(() => {
        const fetchAssignedTasks = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/userassignedtasks/${user?.email}`);

                // Each task object includes the outer userTask _id
                const taskObjects = data.map(entry => ({
                    ...entry.task,
                    userTaskId: entry._id // 👈 attach outer ID
                }));

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
        if (type === "like") {
            setReaction(prev => ({ ...prev, likeCount: prev.likeCount + 1 }));
        } else {
            setReaction(prev => ({ ...prev, disLikeCount: prev.disLikeCount + 1 }));
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            console.log("Status change initiated for task:", taskId, "New Status:", newStatus);
            setUpdatingTaskId(taskId);

            const taskToUpdate = tasks.find((task) => task._id === taskId);
            console.log("Task to update:", taskToUpdate);

            if (!taskToUpdate) {
                alert("Task not found!");
                setUpdatingTaskId(null);
                return;
            }

            // Count logic
            let inProgressDelta = 0;
            let doneDelta = 0;

            if (newStatus === "In Progress" && taskToUpdate.status !== "In Progress") {
                inProgressDelta = 1;
            } else if (newStatus !== "In Progress" && taskToUpdate.status === "In Progress") {
                inProgressDelta = -1;
            }

            if (newStatus === "Completed" && taskToUpdate.status !== "Completed") {
                doneDelta = 1;
            } else if (newStatus !== "Completed" && taskToUpdate.status === "Completed") {
                doneDelta = -1;
            }

            // Prepare the update fields for both collections
            const updateFields = { status: newStatus };
            const countOnlyFields = {
                inProgressCount: inProgressDelta,
                doneCount: doneDelta
            };

            // Update UI immediately (local state update)
            const updatedTasks = tasks.map(task =>
                task._id === taskId ? {
                    ...task,
                    status: newStatus,
                    inProgressCount: (task.inProgressCount || 0) + inProgressDelta,
                    doneCount: (task.doneCount || 0) + doneDelta
                } : task
            );
            setTasks(updatedTasks);

            // ✅ Use outer _id for user task collection (updating status)
            const userTaskRes = await axios.put(`http://localhost:5000/mytasks/${taskToUpdate.userTaskId}`, updateFields);
            console.log("User task update response:", userTaskRes.data);

            // 🧠 Use inner _id for task collection (update counts only)
            const taskRes = await axios.put(`http://localhost:5000/task/${taskId}`, countOnlyFields);
            console.log("Main task count update response:", taskRes.data);

        } catch (error) {
            console.error("Error updating task status:", error);
            alert("Failed to update task status. Please try again.");
        } finally {
            setUpdatingTaskId(null);
        }
    };



    return (
        <div className="space-y-6 p-4">
            {tasks.length === 0 ? (
                <p className="text-center text-gray-500">No tasks assigned to you yet.</p>
            ) : (
                tasks.map((task) => (
                    <motion.div
                        key={task._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 bg-white rounded-lg shadow-md border-l-4 transition-all hover:shadow-xl"
                        style={{ borderColor: statusColors[task.status] || "gray" }}
                    >
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-lg">{task.title}</h4>
                            <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusColors[task.status]} text-white`}>
                                {task.status}
                            </span>
                        </div>

                        <p className="text-gray-600 mt-2">{task.description}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Due: {new Date(task.dueDate).toLocaleString()}
                        </p>

                        {task.fileUrl && (
                            <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center mt-2">
                                <FaLink className="mr-1" /> View File
                            </a>
                        )}

                        <div className="mt-2">
                            <p>In Progress Count: <strong>{task.inProgressCount}</strong></p>
                            <p>Done Count: <strong>{task.doneCount}</strong></p>
                        </div>

                        <div className="mt-3">
                            <div className="flex items-center space-x-3 text-2xl">
                                <FiThumbsUp
                                    onClick={() => handleReaction("like")}
                                    className={`cursor-pointer hover:text-gray-500 transition duration-200 ${activeReaction === "like" ? "text-blue-500" : ""}`}
                                />
                                <FiThumbsDown
                                    onClick={() => handleReaction("dislike")}
                                    className={`cursor-pointer hover:text-gray-500 transition duration-200 ${activeReaction === "dislike" ? "text-blue-500" : ""}`}
                                />
                            </div>
                            <p className="text-xs mt-1 text-gray-500">
                                {reaction.likeCount} Likes & {reaction.disLikeCount} Dislikes
                            </p>
                        </div>
                        {updatingTaskId === task._id ? (
                            <div className="text-blue-500 text-sm mt-2 animate-pulse">Updating...</div>
                        ) : (
                            <select
                                name="status"
                                value={task.status}
                                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
                            >
                                <option value="To-Do">To-Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        )}
                    </motion.div>
                ))
            )}
        </div>
    );
};

export default MyTask;




