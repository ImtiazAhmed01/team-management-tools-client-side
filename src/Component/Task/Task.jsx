import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaUpload, FaLink } from "react-icons/fa";
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

        const fileUrl = taskData.fileUrl;

        try {
            const response = await axios.post("http://localhost:5000/tasks", {
                title: taskData.title,
                description: taskData.description,
                dueDate: taskData.dueDate,
                status: taskData.status,
                userId: loggedInUserId,
                fileUrl: fileUrl, // Send the file URL
            });

            setTasks([response.data.task, ...tasks]);
        } catch (error) {
            console.error("Error adding task:", error);
        }

        setShowForm(false);
        setTaskData({
            title: "",
            description: "",
            dueDate: "",
            file: null,
            fileUrl: "",
            status: "To-Do",
        });
    };



    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
                <button onClick={toggleForm} className="bg-blue-500 text-white px-5 py-2 rounded-lg flex items-center shadow-lg">
                    <FaPlus className="mr-2" /> Add Task
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <motion.div className="bg-white p-8 rounded-xl shadow-xl w-1/2 relative">
                        <button onClick={toggleForm} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
                            <FaTimes size={20} />
                        </button>
                        <h3 className="text-xl font-bold text-gray-800 mb-5">Create Task</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" name="title" placeholder="Task Title" value={taskData.title} onChange={handleChange} required className="w-full p-3 border rounded-md" />
                            <textarea name="description" placeholder="Task Description" value={taskData.description} onChange={handleChange} className="w-full p-3 border rounded-md" />
                            <input type="datetime-local" name="dueDate" value={taskData.dueDate} onChange={handleChange} required className="w-full p-3 border rounded-md" />
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md cursor-pointer">
                                    <FaUpload className="text-blue-500" />
                                    <span>Upload File</span>
                                    <input type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                                {taskData.file && <span className="text-sm text-gray-600">{taskData.file.name}</span>}
                            </div>
                            <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded-md w-full">Create Task</button>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* <div className="space-y-4">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard key={task.id} task={task} loggedInUserId={loggedInUserId} onDelete={handleDelete} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No tasks yet.</p>
                )}
            </div> */}
        </div>
    );
};

const TaskCard = ({ task, loggedInUserId, onDelete }) => (
    <motion.div className="p-5 bg-white rounded-lg shadow-md border-l-4">
        <div className="flex justify-between items-center">
            <h4 className="font-semibold text-lg">{task.title}</h4>
            <span className="text-sm font-bold px-3 py-1 rounded-full bg-gray-400 text-white">{task.status}</span>
        </div>
        <p className="text-gray-600 mt-2">{task.description}</p>
        <p className="text-sm text-gray-500 mt-1">Due: {new Date(task.dueDate).toLocaleString()}</p>
        {task.fileUrl && <a href={task.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center mt-2"><FaLink className="mr-1" /> View File</a>}
        {task.userId === loggedInUserId && (
            <div className="mt-4 flex space-x-3">
                <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white px-4 py-2 rounded shadow-md"><FaTrash /></button>
            </div>
        )}
    </motion.div>
);

export default Task;
