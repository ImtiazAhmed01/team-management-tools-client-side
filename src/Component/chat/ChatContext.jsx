import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import useAuth from "../provider/useAuth";
import axios from "axios";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize socket
  useEffect(() => {
    if (!user) return;

    const newSocket = io("http://localhost:5000", {
      // autoConnect: true,
      // reconnectionAttempts: 5,
      // reconnectionDelay: 1000,
      query: {
        userId: user?.uid,
        email: user?.email,
      },
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      if (roomId) {
        newSocket.emit("joinRoom", roomId);
      }
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    // Handle new messages from others
    newSocket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Handle chat history on join
    newSocket.on("chatHistory", (history) => {
      setMessages(history);
    });

    // Handle chat errors (optional)
    newSocket.on("chatError", (err) => {
      console.error("Chat error:", err);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user, roomId]);

  // Fetch message history from API and join room
  useEffect(() => {
    if (socket && roomId) {
      socket.emit("joinRoom", roomId);

      axios
        .get(`https://team-management-tools-server-side.onrender.com/api/messages/${roomId}`)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.error("Failed to load messages:", err);
        });
    }
  }, [roomId, socket]);

  const sendMessage = useCallback(
    (messageContent) => {
      if (socket && messageContent && roomId) {
        const messageData = {
          roomId,
          senderId: user?.uid,
          senderName: user?.displayName || user?.email,
          message: messageContent,
          timestamp: new Date().toISOString(),
        };
        socket.emit("sendMessage", messageData);
      }
    },
    [socket, roomId, user]
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        setRoomId,
        roomId,
        isConnected,
        currentUser: user,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
