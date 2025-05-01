import React, { useState, useEffect, useContext } from "react";
import {
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash,
  FaUpload,
  FaLink,
  FaSearch,
  FaComment,
} from "react-icons/fa";

import { motion } from "framer-motion";
import axios from "axios";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { toast, Bounce } from "react-toastify";

import { AuthContext } from "../provider/authProvider";

import useAuth from "../provider/useAuth";
import { useNavigate } from "react-router-dom";

const Task = ({ loggedInUserId }) => {
  const { user } = useAuth();
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
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  //    fetching user role
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/profileInfo/${user?.email}`)
        .then((res) => {
          const userData = res.data?.[0];
          setUserRole(userData);
        })
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (taskData.id) {
        // UPDATE TASK
        await axios.put(`http://localhost:5000/tasks/${taskData.id}`, taskData);
        toast.success("Task updated successfully!", {
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
        setShowForm(false);
      } else {
        // CREATE TASK
        await axios.post("http://localhost:5000/tasks", taskData);
        toast.success("Task created successfully!", {
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
        setShowForm(false);
      }

      // Refresh task list
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);

      // Reset form
      setTaskData({
        id: null,
        title: "",
        description: "",
        dueDate: "",
        fileUrl: "",
      });
    } catch (error) {
      console.error("Error submitting task:", error);
      toast.error("Something went wrong!", {
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
      setShowForm(false);
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
        (filter === "Due Today" &&
          new Date(task.dueDate).toDateString() ===
            new Date().toDateString()) ||
        (filter === "Due This Week" &&
          new Date(task.dueDate) <=
            new Date(new Date().setDate(new Date().getDate() + 7))) ||
        (filter === "Completed Tasks" && task.status === "Completed") ||
        (filter === "In Progress" && task.status === "In Progress") ||
        (filter === "To-Do" && task.status === "To-Do");

      const matchesSearch =
        search === "" ||
        task.title.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg my-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Tasks</h2>
        <button
          onClick={toggleForm}
          disabled={
            !(
              userRole?.userRole === "admin" ||
              userRole?.userRole === "group leader"
            )
          }
          className={`px-5 py-2 rounded-lg flex items-center shadow-lg
      ${
        userRole?.userRole === "admin" || userRole?.userRole === "group leader"
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }
    `}
        >
          <FaPlus className="mr-2" /> Add Task
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-3 shadow-md rounded-md focus:ring-2 focus:ring-blue-400 transition-all dark:text-gray-200 dark:shadow-gray-600 dark:bg-gray-800"
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
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full shadow-md p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-400 transition-all dark:text-gray-200 dark:shadow-gray-600"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      <div className="space-y-4">
        {filterTasks().length > 0 ? (
          filterTasks().map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              loggedInUserId={loggedInUserId}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
      </div>
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <motion.div className="bg-white p-8 rounded-xl shadow-xl w-1/2 relative">
            <button
              onClick={toggleForm}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <FaTimes size={20} />
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-5">
              {taskData.id ? "Edit Task" : "Create Task"}
            </h3>
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

              <button
                type="submit"
                className="bg-green-500 text-white px-5 py-2 rounded-md w-full hover:bg-green-600 transition"
              >
                {taskData.id ? "Update Task" : "Create Task"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const TaskCard = ({ task, loggedInUserId, onDelete, onEdit }) => {
  const statusColors = {
    "To-Do": "bg-gray-400",
    "In Progress": "bg-yellow-400",
    Completed: "bg-green-500",
  };
  const [reaction, setReaction] = useState({ likeCount: 0, disLikeCount: 0 });
  const [userReaction, setUserReaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const loggedInUserIds = user?.uid;
  // checking if a particular task is assigned or not. If not then assign {Imtiaz} starts here
  const [assigned, setAssigned] = useState(false);

  useEffect(() => {
    const checkIfAssigned = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/is-assigned/${task._id}/${user?.email}`
        );
        setAssigned(data.assigned);
      } catch (error) {
        console.error("Error checking task assignment", error);
      }
    };

    if (user?.email) {
      checkIfAssigned();
    }
  }, [task._id, user?.email]);

  const handleAssignTask = async () => {
    if (!assigned) {
      // Log the data being sent to the backend
      console.log("Sending data to backend:", {
        task, // Log taskId
        userId: loggedInUserIds,
        email: user?.email, // Log email
      });

      try {
        const { data } = await axios.post("http://localhost:5000/assign-task", {
          task,
          userId: loggedInUserIds,
          email: user?.email,
        });

        toast.success(data.message, {
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
        setAssigned(true);
      } catch (error) {
        console.error("Error assigning task:", error);
        toast.error("Error assigning task", {
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
    }
  };

  useEffect(() => {
    const fetchReaction = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/reaction/${task._id}`
        );
        setReaction({
          likeCount: data?.likeCount || 0,
          disLikeCount: data?.disLikeCount || 0,
        });
      } catch (error) {
        console.error("Error fetching reactions:", error);
      }
    };

    if (task._id) {
      fetchReaction();
    }
  }, [task._id]);

  const handleReaction = async (newReaction) => {
    if (loading) return;
    setLoading(true);

    // Optimistically update UI first
    const previousReaction = userReaction;
    let newLikeCount = reaction.likeCount;
    let newDislikeCount = reaction.disLikeCount;

    // Calculate new counts based on previous reaction
    if (previousReaction === newReaction) {
      // Clicking same reaction - remove it
      setUserReaction(null);
      if (newReaction === "like") newLikeCount -= 1;
      if (newReaction === "dislike") newDislikeCount -= 1;
    } else {
      // Switching reaction or adding new one
      setUserReaction(newReaction);

      // Remove previous reaction count
      if (previousReaction === "like") newLikeCount -= 1;
      if (previousReaction === "dislike") newDislikeCount -= 1;

      // Add new reaction count
      if (newReaction === "like") newLikeCount += 1;
      if (newReaction === "dislike") newDislikeCount += 1;
    }

    // Update UI immediately
    setReaction({
      likeCount: newLikeCount,
      disLikeCount: newDislikeCount,
    });

    try {
      // Send request to backend
      await axios.post("http://localhost:5000/reactions", {
        cardId: task._id,
        reactions: previousReaction === newReaction ? null : newReaction,
      });
    } catch (error) {
      console.error("Error updating reaction:", error);
    } finally {
      setLoading(false);
    }
  };

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => {
        const formattedUsers = data.map((user) => ({
          id: user._id,
          display: user.fullName,
          Email: user.email,
          photo: user.photoURL,
        }));
        setUserInfo(formattedUsers);
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 bg-white dark:bg-gray-700 rounded-lg shadow-md border-l-4 border-blue-600 transition-all hover:shadow-xl"
      style={{ borderColor: statusColors[task.status] || "gray" }}
    >
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg dark:text-white">{task.title}</h4>
        <span
          className={`text-sm font-bold px-3 py-1 rounded-full ${
            statusColors[task.status]
          } text-white`}
        >
          {task.status}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{task.description}</p>
      <p className="text-sm text-gray-500 dark:text-gray-200 mt-1">
        Due: {new Date(task.dueDate).toLocaleString()}
      </p>

      {task.fileUrl && (
        <a
          href={task.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 dark:text-blue-300 flex items-center mt-2"
        >
          <FaLink className="mr-1" /> View File
        </a>
      )}
      <div className=" dark:text-gray-200">Done Count:{task.doneCount}</div>
      <div className=" dark:text-gray-200">In Progress Count:{task.inProgressCount}</div>

      {task.userId === loggedInUserId && (
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-3">
            <button
              onClick={() => onEdit(task)}
              className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-600 transition"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition"
            >
              <FaTrash />
            </button>

            {/* comment redirect button */}
            <button
              onClick={() => navigate(`/comment/${task._id}`)}
              className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition cursor-pointer"
            >
              <FaComment />
            </button>

            {task.userId === loggedInUserId && (
              <button
                button
                onClick={handleAssignTask}
                disabled={assigned}
                className={`bg-green-500 text-white px-4 py-2 rounded shadow-md ${
                  assigned
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-600"
                } transition`}
              >
                {assigned ? "Assigned" : "Assign Me"}
              </button>
            )}
          </div>

          <div className="mt-2">
            <div className="flex justify-center space-x-1">
              <button
                onClick={() => handleReaction("like")}
                disabled={loading}
                className={`
                    p-1 transition-all duration-200 flex justify-center items-center flex-col
                    ${
                      userReaction === "like"
                        ? "text-blue-600"
                        : "text-gray-500 dark:text-gray-50 hover:text-blue-500 hover:scale-105"
                    }
                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <FiThumbsUp className="text-2xl" />
                {/* <span className="text-xs ml-1">{reaction.likeCount} Likes</span> */}
              </button>
              <button
                onClick={() => handleReaction("dislike")}
                disabled={loading}
                className={`
                    p-1 transition-all duration-200 flex justify-center items-center flex-col
                    ${
                      userReaction === "dislike"
                        ? "text-red-600"
                        : "text-gray-500 dark:text-gray-50 hover:text-red-500 hover:scale-105"
                    }
                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <FiThumbsDown className="text-2xl mt-1" />
                {/* <span className="text-xs ml-1">{reaction.disLikeCount} Dislikes</span> */}
              </button>
            </div>
            <div>
              <p className="text-[8px] text-center mt-1 dark:text-gray-200">
                {reaction.likeCount} Likes & {reaction.disLikeCount} Dislikes
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Task;
