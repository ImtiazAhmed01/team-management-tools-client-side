import React, { useState } from "react";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaUpload, FaLink } from "react-icons/fa";
import { motion } from "framer-motion";

const TaskList = ({ loggedInUserId }) => {


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


export default TaskList;

