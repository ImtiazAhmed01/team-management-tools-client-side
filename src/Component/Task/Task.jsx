import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaLink } from "react-icons/fa";
import { motion } from "framer-motion";

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

    // Fetch tasks from backend when component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch("http://localhost:5000/tasks");
            const data = await response.json();
            setTasks(data);
        };
        fetchTasks();
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

        if (taskData._id) {
            // If editing an existing task, update it in the backend
            await fetch(`http://localhost:5000/tasks/${taskData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });

            // Update task in frontend state
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskData._id ? { ...task, ...newTask, _id: task._id } : task
                )
            );
        } else {
            // If creating a new task, add it to the backend
            const response = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });
            const createdTask = await response.json();
            setTasks((prevTasks) => [createdTask, ...prevTasks]);
        }

        setShowForm(false);
        setTaskData({ _id: null, title: "", description: "", dueDate: "", fileUrl: "", status: "To-Do" });
    };


    const handleDelete = async (taskId) => {
        await fetch(`http://localhost:5000/tasks/${taskId}`, { method: "DELETE" });
        setTasks(tasks.filter((task) => task._id !== taskId)); 
    };


    const handleEdit = (task) => {
        setTaskData(task);
        setShowForm(true);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
                <button
                    onClick={toggleForm}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-lg flex items-center shadow-lg hover:scale-105 transition"
                >
                    <FaPlus className="mr-2" /> Add Task
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white p-8 rounded-xl shadow-xl w-1/2 relative transition-all"
                    >
                        <button onClick={toggleForm} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
                            <FaTimes size={20} />
                        </button>
                        <h3 className="text-xl font-bold text-gray-800 mb-5">{taskData.id ? "Edit Task" : "Create Task"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Task Title"
                                value={taskData.title}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                            <textarea
                                name="description"
                                placeholder="Task Description"
                                value={taskData.description}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                            <input
                                type="datetime-local"
                                name="dueDate"
                                value={taskData.dueDate}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                            <input
                                type="url"
                                name="fileUrl"
                                placeholder="Or provide an external link"
                                value={taskData.fileUrl}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                            <select
                                name="status"
                                value={taskData.status}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
                            >
                                <option value="To-Do">To-Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>

                            <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded-md w-full hover:bg-green-600 transition">
                                {taskData.id ? "Update Task" : "Create Task"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}

            <div className="space-y-4">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            loggedInUserId={loggedInUserId}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No tasks yet.</p>
                )}
            </div>
        </div>
    );
};

const TaskCard = ({ task, loggedInUserId, onDelete, onEdit }) => {
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

            {task.userId === loggedInUserId && (
                <div className="mt-4 flex space-x-3">
                    <button onClick={() => onEdit(task)} className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition">
                        <FaEdit />
                    </button>
                    <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition">
                        <FaTrash />
                    </button>

                </div>
            )}
        </motion.div>
    );
};

export default Task;