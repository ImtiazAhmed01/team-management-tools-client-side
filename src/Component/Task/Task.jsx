import React, { useState, useEffect } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaUpload, FaLink, FaFilter, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const Task = ({ loggedInUserId }) => {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        dueDate: "",
        file: null,
        fileUrl: "",
        status: "To-Do",
    });
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Fetch tasks from API
        fetch("http://localhost:5000/tasks")
            .then(res => res.json())
            .then(data => setTasks(data));
    }, []);

    const toggleForm = () => setShowForm(!showForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setTaskData((prev) => ({ ...prev, file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskData.title || !taskData.dueDate) {
            alert("Please fill in the required fields.");
            return;
        }

        const newTask = {
            id: Date.now(),
            userId: loggedInUserId,
            ...taskData,
        };

        setTasks([newTask, ...tasks]);

        await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });

        setShowForm(false);
        setTaskData({ title: "", description: "", dueDate: "", file: null, fileUrl: "", status: "To-Do" });
    };

    const handleDelete = async (taskId) => {
        await fetch(`http://localhost:5000/tasks/${taskId}`, { method: "DELETE" });
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleEdit = (task) => {
        setTaskData(task);
        setShowForm(true);
    };

    const filterTasks = () => {
        return tasks.filter(task => {
            const matchesFilter =
                filter === "All" ||
                (filter === "My Tasks" && task.userId === loggedInUserId) ||
                (filter === "Tasks with Attachments" && (task.file || task.fileUrl)) ||
                (filter === "Due Today" && new Date(task.dueDate).toDateString() === new Date().toDateString()) ||
                (filter === "Due This Week" && new Date(task.dueDate) <= new Date(new Date().setDate(new Date().getDate() + 7))) ||
                (filter === "Completed Tasks" && task.status === "Completed");
            
            const matchesSearch = search === "" || task.title.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg my-20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
                <button
                    onClick={toggleForm}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-lg flex items-center shadow-lg hover:scale-105 transition"
                >
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
                    <option value="Completed Tasks">Completed Tasks</option>
                </select>
                <div className="relative w-full">
                    <input type="text" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full shadow-md p-3 pl-10  rounded-md focus:ring-2 focus:ring-blue-400 transition-all" />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>
          
            <div className="space-y-4">
                {filterTasks().length > 0 ? (
                    filterTasks().map((task) => (
                        <TaskCard key={task.id} task={task} loggedInUserId={loggedInUserId} onDelete={handleDelete} onEdit={handleEdit} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No tasks found.</p>
                )}
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
                        <h3 className="text-xl font-bold text-gray-800 mb-5">Create Task</h3>
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

                            {/* File Upload */}
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md cursor-pointer">
                                    <FaUpload className="text-blue-500" />
                                    <span>Upload File</span>
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                                {taskData.file && <span className="text-sm text-gray-600">{taskData.file.name}</span>}
                            </div>

                            {/* External Link */}
                            <input
                                type="url"
                                name="fileUrl"
                                placeholder="Or provide an external link"
                                value={taskData.fileUrl}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
                            />

                            {/* Task Status Dropdown */}
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
                                Create Task
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
                    <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition">
                        <FaTrash />
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default Task;