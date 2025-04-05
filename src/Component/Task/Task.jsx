import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaUpload, FaLink, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const Task = ({ loggedInUserId }) => {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskData, setTaskData] = useState({
        id: null,
        title: "",
        description: "",
        dueDate: "",
        fileUrl: "",
        status: "To-Do",
    });
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    useEffect(() => {

        axios.get("http://localhost:5000/tasks").then((response) => {

            setTasks(response.data);
        });
    }, []);

    const toggleForm = () => setShowForm(!showForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskData.title || !taskData.dueDate) {
            alert("Please fill in the required fields.");
            return;
        }

        const newTask = {
            userId: loggedInUserId,
            title: taskData.title,
            description: taskData.description,
            dueDate: taskData.dueDate,
            fileUrl: taskData.fileUrl || "",
            status: taskData.status,
        };

        try {
            if (taskData.id) {
                await axios.put(`http://localhost:5000/tasks/${taskData.id}`, newTask);

            } else {
                await axios.post("http://localhost:5000/tasks", newTask);
            }

            const response = await axios.get("http://localhost:5000/tasks");
            setTasks(response.data);

            setShowForm(false);
            setTaskData({ id: null, title: "", description: "", dueDate: "", fileUrl: "", status: "To-Do" });
        } catch (error) {
            console.error("Error saving task:", error);
            alert("Failed to save task. Please try again.");
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            console.log("Updating Task ID:", taskId, "New Status:", newStatus); // Debug log

            const taskToUpdate = tasks.find((task) => task._id === taskId);

            if (!taskToUpdate) {
                alert("Task not found!");
                return;
            }

            const updatedTask = { ...taskToUpdate, status: newStatus };

            console.log("Payload Sent to Backend:", updatedTask); // Debug log

            const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedTask);

            console.log("Backend Response:", response.data); // Debug log

            const updatedTasks = await axios.get("http://localhost:5000/tasks");
            setTasks(updatedTasks.data);
        } catch (error) {
            console.error("Error updating task status:", error);
            alert("Failed to update task status. Please try again.");
        }
    };



    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${taskId}`);


            const response = await axios.get("http://localhost:5000/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Failed to delete task. Please try again.");
        }
    };

    const handleEdit = (task) => {
        setTaskData({ ...task, id: task._id });
        setShowForm(true);
    };


    const filterTasks = () => {
        return tasks.filter((task) => {
            const matchesFilter =
                filter === "All" ||
                (filter === "My Tasks" && task.userId === loggedInUserId) ||
                (filter === "Tasks with Attachments" && task.fileUrl) ||
                (filter === "Due Today" && new Date(task.dueDate).toDateString() === new Date().toDateString()) ||
                (filter === "Due This Week" && new Date(task.dueDate) <= new Date(new Date().setDate(new Date().getDate() + 7))) ||
                (filter === "Completed Tasks" && task.status === "Completed") ||
                (filter === "In Progress" && task.status === "In Progress") ||
                (filter === "To-Do" && task.status === "To-Do");

            const matchesSearch = search === "" || task.title.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg my-20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
                <button onClick={toggleForm} className="bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center shadow-lg">
                    <FaPlus className="mr-2" /> Add Task
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-3 shadow-md rounded-md focus:ring-2 focus:ring-blue-400 transition-all">
                    <option value="All">All Tasks</option>
                    <option value="My Tasks">My Tasks</option>
                    <option value="Tasks with Attachments">Tasks with Attachments</option>
                    <option value="Due Today">Due Today</option>
                    <option value="Due This Week">Due This Week</option>
                    <option value="In Progress">In Progress</option>
                    <option value="To-Do">To-Do</option>
                    <option value="Completed Tasks">Completed Tasks</option>
                </select>
                <div className="relative w-full">
                    <input type="text" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full shadow-md p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-400 transition-all" />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>
            <div className="space-y-4">
                {filterTasks().length > 0 ? (
                    filterTasks().map((task) => (
                        <TaskCard key={task.id} task={task} loggedInUserId={loggedInUserId} onDelete={handleDelete} onEdit={handleEdit} onStatusChange={handleStatusChange} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No tasks found.</p>
                )}
            </div>
            {showForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <motion.div className="bg-white p-8 rounded-xl shadow-xl w-1/2 relative">
                        <button onClick={toggleForm} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
                            <FaTimes size={20} />
                        </button>
                        <h3 className="text-xl font-bold text-gray-800 mb-5">{taskData.id ? "Edit Task" : "Create Task"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" name="title" placeholder="Task Title" value={taskData.title} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all" />
                            <textarea name="description" placeholder="Task Description" value={taskData.description} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all" />
                            <input type="datetime-local" name="dueDate" value={taskData.dueDate} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all" />
                            <input type="url" name="fileUrl" placeholder="Or provide an external link" value={taskData.fileUrl} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all" />
                            {/* <select name="status" value={taskData.status} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all">
                                <option value="To-Do">To-Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select> */}
                            <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded-md w-full hover:bg-green-600 transition">
                                {taskData.id ? "Update Task" : "Create Task"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
// const TaskCard = ({ task, loggedInUserId, onDelete, onEdit }) => {
//     const statusColors = {
//         "To-Do": "bg-gray-400",
//         "In Progress": "bg-yellow-400",
//         "Completed": "bg-green-500",
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="p-5 bg-white rounded-lg shadow-md border-l-4 transition-all hover:shadow-xl"
//             style={{ borderColor: statusColors[task.status] || "gray" }}
//         >
//             <div className="flex justify-between items-center">
//                 <h4 className="font-semibold text-lg">{task.title}</h4>
//                 <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusColors[task.status]} text-white`}>
//                     {task.status}
//                 </span>
//             </div>
//             <p className="text-gray-600 mt-2">{task.description}</p>
//             <p className="text-sm text-gray-500 mt-1">Due: {new Date(task.dueDate).toLocaleString()}</p>

//             {task.fileUrl && (
//                 <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center mt-2">
//                     <FaLink className="mr-1" /> View File
//                 </a>
//             )}

//             {task.userId === loggedInUserId && (
//                 <div className="mt-4 flex space-x-3">
//                     <button onClick={() => onEdit(task)} className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition">
//                         <FaEdit />
//                     </button>
//                     <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition">
//                         <FaTrash />
//                     </button>
//                     <select name="status" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all">

//                         <option value="In Progress">In Progress</option>
//                         <option value="Completed">Completed</option>
//                     </select>

//                 </div>
//             )}
//         </motion.div>
//     );
// };
const TaskCard = ({ task, loggedInUserId, onDelete, onEdit, onStatusChange }) => {
    const statusColors = {
        "To-Do": "bg-gray-400",
        "In Progress": "bg-yellow-400",
        "Completed": "bg-green-500",
    };

    return (
        <motion.div
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
            <p className="text-sm text-gray-500 mt-1">Due: {new Date(task.dueDate).toLocaleString()}</p>

            {task.fileUrl && (
                <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center mt-2">
                    <FaLink className="mr-1" /> View File
                </a>
            )}
            <div>
                Done Count:{task.doneCount}
            </div>
            <div>
                In Progress Count:{task.inProgressCount}
            </div>

            {task.userId === loggedInUserId && (
                <div className="mt-4 flex space-x-3">
                    <button onClick={() => onEdit(task)} className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition">
                        <FaEdit />
                    </button>
                    <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition">
                        <FaTrash />
                    </button>
                    <select
                        name="status"
                        value={task.status}
                        onChange={(e) => onStatusChange(task._id, e.target.value)}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
                    >
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            )}
        </motion.div>
    );
};


export default Task;