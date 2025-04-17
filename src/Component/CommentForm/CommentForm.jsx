
// import React, { useState, useEffect } from "react";
// import { MdSend } from "react-icons/md";

// import axios from "axios";
// import { toast, Bounce } from "react-toastify";
// import { Mention, MentionsInput } from "react-mentions";

// const CommentForm = ({ task, user }) => {
//     const [commentInput, setCommentInput] = useState("");
//     const [mentions, setMentions] = useState([]);
//     const [userInfo, setUserInfo] = useState([]);

//     useEffect(() => {
//         fetch("http://localhost:5000/user")
//             .then((res) => res.json())
//             .then((data) => {
//                 const formattedUsers = data.map((user) => ({
//                     id: user._id,
//                     display: user.fullName,
//                     Email: user.email,
//                 }));
//                 setUserInfo(formattedUsers);
//             })
//             .catch((err) => console.error("Failed to fetch users:", err));
//     }, []);

//     const handleCommentSubmit = async (event) => {
//         event.preventDefault();
//         if (!commentInput.trim()) return;

//         const userName = user?.displayName || "Anonymous";
//         const time = new Date().toISOString();
//         const commentInfo = { userName, comment: commentInput, time };

//         try {
//             const { data } = await axios.post(
//                 `http://localhost:5000/comments/${task._id}`,
//                 { commentInfo }
//             );
//             if (data.insertedId) {
//                 setCommentInput("");
//                 toast.success("Comment added", { autoClose: 3000, transition: Bounce });
//                 // Optionally: call a parent function to update the comment list
//             } else {
//                 toast.error("Something went wrong!", { autoClose: 3000, transition: Bounce });
//             }
//         } catch (err) {
//             console.error("Error submitting comment:", err);
//             toast.error("Failed to submit comment.", { autoClose: 3000, transition: Bounce });
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleCommentSubmit} className="space-y-4 mt-2">
//                 <div className="relative">
//                     <MentionsInput
//                         value={commentInput}
//                         onChange={(e) => setCommentInput(e.target.value)}
//                         // className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 transition-all"
//                         placeholder="Write a comment... use @ to mention"
//                         style={{
//                             control: {
//                                 fontSize: 14,
//                                 padding: "10px",
//                                 border: "1px solid #ccc",
//                                 borderRadius: "6px",
//                             },
//                             highlighter: {
//                                 overflow: "hidden",
//                             },
//                             input: {
//                                 margin: 0,
//                             },
//                         }}
//                     >
//                         <Mention
//                             trigger="@"
//                             data={userInfo}
//                             displayTransform={(display) => `${display}`}
//                             markup="@__display__"
//                             style={{ backgroundColor: "#d1eaff" }}
//                         />
//                     </MentionsInput>

//                     <button type="submit">
//                         <MdSend className="absolute top-3 right-3 cursor-pointer" />
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CommentForm;


