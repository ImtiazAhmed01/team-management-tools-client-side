import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../provider/useAuth";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { Mention, MentionsInput } from "react-mentions";

const Comment = () => {
  const [reaction, setReaction] = useState({ likeCount: 0, disLikeCount: 0 });
  const [userReaction, setUserReaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [comment, setComment] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const statusColors = {
    "To-Do": "bg-gray-400",
    "In Progress": "bg-yellow-400",
    Completed: "bg-green-500",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/task/${id}`)
      .then((res) => setTask(res.data));
  }, [id]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const userName = user?.displayName;
    const time = new Date().toISOString();
    const commentInfo = { userName, comment: commentInput, time };

    try {
      const { data } = await axios.post(
        `http://localhost:5000/comments/${id}`,
        { commentInfo }
      );
      if (data.insertedId) {
        setCommentInput("");
        toast.success("Comment added");
        setComment((prevComments) => [...prevComments, commentInfo]);
        // await sendMentionNotifications(commentInput, id, userName);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit comment.");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (id) {
        try {
          const { data } = await axios.get(
            `http://localhost:5000/comment/${id}`
          );
          setComment(data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };
    fetchComments();
  }, [id]);

  //   fetch reactions
  useEffect(() => {
    const fetchReaction = async () => {
      const { data } = await axios.get(`http://localhost:5000/reaction/${id}`);
      setReaction(data);
    };
    if (id) {
      fetchReaction();
    }
  }, [id]);

  // mention
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

  const handleReaction = async (newReaction) => {
    if (loading) return;
    setLoading(true);

    // update UI first
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

  return (
    <div className="lg:w-10/12 mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl mt-5 mb-10 h-screen overflow-y-auto">
      {/* Task Header Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-bold text-2xl md:text-2xl text-gray-800 dark:text-white mb-2">
              {task.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed lg:pr-32">
              {task.description}
            </p>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 md:w-28 text-center rounded-full ${
              statusColors[task.status]
            } text-white shadow-md`}
          >
            {task.status}
          </span>
        </div>

        <div className="flex items-center mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Due:{" "}
            {new Date(task.dueDate).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Comment Input Section */}
      <div className="mb-8">
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-end md:gap-4 gap-1"
        >
          <div className="flex-1 relative w">
            <MentionsInput
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment... @mention teammates"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-white shadow-sm"
              style={{
                mention: {
                  backgroundColor: "#3B82F6",
                  color: "#ffffff",
                  padding: "2px 6px",
                  borderRadius: "6px",
                  fontWeight: 500,
                },
              }}
            >
              <Mention
                trigger="@"
                data={userInfo}
                displayTransform={(display) => `@${display}`}
                markup="@__display__"
                renderSuggestion={(
                  suggestion,
                  search,
                  highlightedDisplay,
                  index,
                  focused
                ) => (
                  <div
                    className={`flex items-center gap-3 px-3 py-2 ${
                      focused
                        ? "bg-blue-100 dark:bg-gray-600"
                        : "bg-white dark:bg-gray-700"
                    } cursor-pointer`}
                  >
                    <img
                      src={suggestion.photo}
                      alt={suggestion.display}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {highlightedDisplay}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {suggestion.Email}
                      </p>
                    </div>
                  </div>
                )}
              />
            </MentionsInput>

            <button
              type="submit"
              className="absolute md:right-3 right-2 bottom-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200 shadow-md"
            >
              <MdSend className="text-lg" />
            </button>
          </div>

          <div className="flex md:gap-3 gap-1 mb-1 xs:w-2/6">
            <button
              onClick={() => handleReaction("like")}
              disabled={loading}
              type="button"
              className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-4 -mb-1 rounded-lg transition-all duration-200"
            >
              <FiThumbsUp
                className={`text-gray-700 dark:text-gray-300 md:text-2xl ${
                  userReaction === "like"
                    ? "text-blue-600"
                    : "text-gray-500 dark:text-gray-50 hover:text-blue-500 hover:scale-105"
                }
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {reaction.likeCount}
              </span>
            </button>
            <button
              onClick={() => handleReaction("dislike")}
              disabled={loading}
              type="button"
              className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-4 -mb-1 rounded-lg transition-all duration-200"
            >
              <FiThumbsDown
                className={`text-gray-700 dark:text-gray-300 md:text-2xl mt-1 ${
                  userReaction === "dislike"
                    ? "text-red-600"
                    : "text-gray-500 dark:text-gray-50 hover:text-red-500 hover:scale-105"
                }
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {reaction.disLikeCount}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Comments Section */}
      <div className="pt-4">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
          <span className="h-5 w-1 bg-blue-500 rounded-full mr-2"></span>
          Comments ({comment.length})
        </h4>

        {comment.length === 0 ? (
          <div className="text-center py-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {comment.map((commentData, index) => (
              <li key={index} className="group">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                      {user ? (
                        <img
                          src={user.photoURL}
                          alt="user image"
                          className="rounded-full"
                        />
                      ) : (
                        commentData.userName.charAt(0).toUpperCase()
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl rounded-tl-none shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                          {commentData.userName}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(commentData.time).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {commentData.comment}
                      </p>
                    </div>
                    <div className="mt-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                        Reply
                      </button>
                      <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                        Like
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Comment;
