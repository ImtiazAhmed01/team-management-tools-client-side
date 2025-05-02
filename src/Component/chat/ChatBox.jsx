// import { useState, useEffect, useRef } from "react";
// import { useChat } from "./ChatContext";
// import useAuth from "../provider/useAuth";
// import chatbot from "../../assets/chatbot.png";

// const ChatBox = () => {
//   const { user } = useAuth();
//   const { messages, sendMessage, isConnected, roomId, setRoomId } = useChat();
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);
//   const availableRooms = ["general", "support", "team-chat"];
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     sendMessage(input);
//     setInput("");
//   };
//   const handleShowChat = () => {
//     setShow(!show);
//   };

//   return (
//     <div className="">
//       <button
//         className="fixed right-0 -bottom-5 transform -translate-y-1/2 z-50 cursor-pointer"
//         onClick={handleShowChat}
//       >
//         <img src={chatbot} alt="chatbot-image" className="w-14 h-14" />
//       </button>
//       {show && (
//         <div className="flex flex-col h-[500px] w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 fixed right-0 bottom-16 transform">
//           <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-4">
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Chat Room</h2>
//               <span
//                 className={`text-xs px-2 py-1 rounded-full ${
//                   isConnected
//                     ? "bg-green-100 text-green-800"
//                     : "bg-red-100 text-red-800"
//                 }`}
//               >
//                 {isConnected ? "Online" : "Offline"}
//               </span>
//             </div>
//             <p className="text-xs text-indigo-100 mt-1">
//               {user?.displayName || user?.email}
//             </p>

//             {/* Room Selector */}
//             <div className="flex space-x-2 mt-3 overflow-x-auto -ml-1">
//               {availableRooms.map((room) => (
//                 <button
//                   key={room}
//                   onClick={() => setRoomId(room)}
//                   className={`px-3 py-1 text-xs rounded-full ${
//                     roomId === room
//                       ? "bg-white text-indigo-600"
//                       : "bg-indigo-700 text-white hover:bg-indigo-800"
//                   }`}
//                 >
//                   #{room}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//             {messages.length === 0 ? (
//               <div className="flex items-center justify-center h-full text-gray-400">
//                 <p>Please select a <span className="font-bold">ChatRoom</span> first to start a chat</p>
//               </div>
//             ) : (
//               <div className="space-y-2">
//                 {messages.map((msg, idx) => (
//                   <div
//                     key={`${msg.timestamp}-${idx}`}
//                     className={`flex ${
//                       msg.senderId === user?.uid
//                         ? "justify-end"
//                         : "justify-start"
//                     }`}
//                   >
//                     <div
//                       className={`flex flex-col max-w-xs lg:max-w-md ${
//                         msg.senderId === user?.uid ? "items-end" : "items-start"
//                       }`}
//                     >
//                       {msg.senderId !== user?.uid && (
//                         <span className="text-xs font-medium text-gray-500 mb-1">
//                           {msg.senderName || msg.senderId}
//                         </span>
//                       )}
//                       <div
//                         className={`px-4 py-2 rounded-lg ${
//                           msg.senderId === user?.uid
//                             ? "bg-indigo-600 text-white rounded-br-none"
//                             : "bg-white text-gray-800 shadow-sm rounded-bl-none border border-gray-200"
//                         }`}
//                       >
//                         <p className="text-sm">{msg.message}</p>
//                       </div>
//                       <span
//                         className={`text-xs mt-1 ${
//                           msg.senderId === user?.uid
//                             ? "text-indigo-500"
//                             : "text-gray-500"
//                         }`}
//                       >
//                         {new Date(msg.timestamp).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>
//             )}
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="border-t border-gray-200 p-4 bg-white"
//           >
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder={`Message in #${roomId}...`}
//                 disabled={!isConnected}
//               />
//               <button
//                 type="submit"
//                 disabled={!input.trim() || !isConnected}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBox;
import { useState, useEffect, useRef } from "react";
import { useChat } from "./ChatContext";
import useAuth from "../provider/useAuth";
import chatbot from "../../assets/chatbot.png";

const ChatBox = () => {
  const { user } = useAuth();
  const { messages, sendMessage, isConnected, roomId, setRoomId } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const availableRooms = ["general", "support", "team-chat"];
  const [show, setShow] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };
  const handleShowChat = () => {
    setShow(!show);
  };

  return (
    <div className="">
      <button
        className="fixed right-1 -bottom-5 transform -translate-y-1/2 z-50 cursor-pointer"
        onClick={handleShowChat}
      >
        <img
          src={chatbot}
          alt="chatbot-image"
          className="w-10 h-10"
        />
      </button>
      {show && (
        <div className="flex flex-col h-[500px] w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900 overflow-hidden border border-gray-200 dark:border-gray-700 fixed right-2 bottom-12 transform z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-700 dark:to-indigo-600 text-white p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Chat Room</h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  isConnected
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                }`}
              >
                {isConnected ? "Online" : "Offline"}
              </span>
            </div>
            <p className="text-xs text-indigo-100 dark:text-indigo-200 mt-1">
              {user?.displayName || user?.email}
            </p>

            {/* Room Selector */}
            <div className="flex space-x-2 mt-3 overflow-x-auto -ml-1">
              {availableRooms.map((room) => (
                <button
                  key={room}
                  onClick={() => setRoomId(room)}
                  className={`px-3 py-1 text-xs rounded-full ${
                    roomId === room
                      ? "bg-white dark:bg-gray-100 text-indigo-600 dark:text-indigo-800"
                      : "bg-indigo-700 dark:bg-indigo-800 text-white hover:bg-indigo-800 dark:hover:bg-indigo-900"
                  }`}
                >
                  #{room}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-300">
                <p>
                  Please select a <span className="font-bold">ChatRoom</span>{" "}
                  first to start a chat
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((msg, idx) => (
                  <div
                    key={`${msg.timestamp}-${idx}`}
                    className={`flex ${
                      msg.senderId === user?.uid
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex flex-col max-w-xs lg:max-w-md ${
                        msg.senderId === user?.uid ? "items-end" : "items-start"
                      }`}
                    >
                      {msg.senderId !== user?.uid && (
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-300 mb-1">
                          {msg.senderName || msg.senderId}
                        </span>
                      )}
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          msg.senderId === user?.uid
                            ? "bg-indigo-600 dark:bg-indigo-700 text-white rounded-br-none"
                            : "bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 shadow-sm dark:shadow-none rounded-bl-none border border-gray-200 dark:border-gray-500"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      <span
                        className={`text-xs mt-1 ${
                          msg.senderId === user?.uid
                            ? "text-indigo-500 dark:text-indigo-300"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 dark:border-gray-600 p-4 bg-white dark:bg-gray-800"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message in #${roomId}...`}
                disabled={!isConnected}
              />
              <button
                type="submit"
                disabled={!input.trim() || !isConnected}
                className="bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
