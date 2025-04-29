import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../provider/useAuth";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { Mention, MentionsInput } from "react-mentions";

const Comment = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [comment, setComment] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [reaction, setReaction] = useState("");
  const statusColors = {
    "To-Do": "bg-gray-400",
    "In Progress": "bg-yellow-400",
    Completed: "bg-green-500",
  };

  useEffect(() => {
    axios
      .get(`https://team-management-tools-server-side.onrender.com/task/${id}`)
      .then((res) => setTask(res.data));
  }, [id]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const userName = user?.displayName;
    const time = new Date().toISOString();
    const commentInfo = { userName, comment: commentInput, time };

    try {
      const { data } = await axios.post(
        `https://team-management-tools-server-side.onrender.com/comments/${id}`,
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
            `https://team-management-tools-server-side.onrender.com/comment/${id}`
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
      const { data } = await axios.get(`https://team-management-tools-server-side.onrender.com/reaction/${id}`);
      setReaction(data);
    };
    if (id) {
      fetchReaction();
    }
  }, [id]);

  // mention
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetch("https://team-management-tools-server-side.onrender.com/user")
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
    <div className="max-w-3xl mx-auto p-10 bg-white shadow-2xl rounded-lg mt-5 mb-10 h-screen overflow-y-scroll">
      <div className="border-b-2 border-gray-300">
        <div className="flex justify-between items-center">
          <h2 className="font-bold md:text-xl text-lg">{task.title}</h2>
          <span
            className={`text-sm font-bold px-3 py-1 rounded-full md:block hidden ${statusColors[task.status]
              } text-white`}
          >
            {task.status}
          </span>
        </div>
        <p className="font-normal text-lg mt-4 mb-3">{task.description}</p>
        <h4 className="pb-4 flex justify-between items-center">
          <p className="font-semibold">
            Due-Date: {new Date(task.dueDate).toLocaleDateString()}
          </p>
          <span
            className={`text-sm font-bold px-3 py-1 rounded-full md:hidden ${statusColors[task.status]
              } text-white`}
          >
            {task.status}
          </span>
        </h4>
      </div>
      {/* input box for comment */}
      <form
        onSubmit={handleCommentSubmit}
        className="space-y-4 mt-3 px-2 flex justify-between items-center"
      >
        <div className="relative w-3/5">
          {/* <MentionTextarea
            value={commentInput}
            onChange={setCommentInput}
            placeholder="Write a comment with @mentions..."
          /> */}
          {/* <input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write a comment"
            className="border rounded-md p-2 pr-10 w-full"
          /> */}

          <MentionsInput
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write a comment... use @ to mention"
            className="w-full border rounded-md p-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  className={`flex items-center gap-3 px-3 py-2 ${focused ? "bg-blue-100" : "bg-white"
                    } cursor-pointer`}
                >
                  <img
                    src={suggestion.photo}
                    alt={suggestion.display}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800 ">
                      {highlightedDisplay}
                    </p>
                    <p className="text-xs text-gray-500">{suggestion.Email}</p>
                  </div>
                </div>
              )}
            />
          </MentionsInput>

          <button type="submit">
            <MdSend className="absolute top-4 right-3 cursor-pointer" />
          </button>
        </div>
        <div className="flex justify-center items-center space-x-2 text-2xl -mt-7">
          <span className="flex items-center gap-1">
            <p className="font-normal text-xl -mt-1">{reaction.likeCount}</p>
            <FiThumbsUp className="-mt-2" />
          </span>
          <span className="flex items-center gap-1">
            <p className="font-normal text-xl -mt-1">{reaction.disLikeCount}</p>
            <FiThumbsDown className="" />
          </span>
        </div>
      </form>
      <div className="border-b-2 border-gray-300 -mt-6"></div>
      {/*  show comments on the ui */}
      <div className="pt-3">
        <h4 className="text-lg font-semibold text-gray-900"></h4>
        <ul className="space-y-2 mt-2">
          {comment.length === 0 ? (
            <p className="font-normal text-center text-xs capitalize">
              No comments yet
            </p>
          ) : (
            comment.map((commentData, index) => (
              <div key={index} className="text-sm text-gray-900">
                <div className="space-y-1">
                  <h2 className="font-bold text-xl flex items-center gap-1">
                    {commentData.userName}
                  </h2>
                  <p className="pr-15 text-[16px] flex items-center">
                    {/* <span className="h-10 border-l-[3px] border-green-400 pl-1 mt-1"></span> */}
                    {commentData.comment}
                  </p>
                  <div className="text-sm font-normal space-x-2">
                    <span>
                      {new Date(commentData.time).toLocaleDateString()}
                    </span>
                    <span>
                      {new Date(commentData.time).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Comment;
