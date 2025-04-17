

import { useEffect, useRef, useState } from "react";
import axios from "axios";

const MentionTextarea = ({ value, onChange, placeholder = "Write a comment..." }) => {
    const [users, setUsers] = useState([]);
    const [mentionSuggestions, setMentionSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/user");
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users:", err.message);
            }
        };
        fetchUsers();
    }, []);
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        onChange(inputValue);
        const cursor = e.target.selectionStart;
        setCursorPosition(cursor);
        const lastAtIndex = inputValue.lastIndexOf("@", cursor - 1);
        if (lastAtIndex !== -1) {
            const query = inputValue.slice(lastAtIndex + 1, cursor);
            if (query.length > 0) {
                const filtered = users.filter((user) =>
                    user.fullName.toLowerCase().includes(query.toLowerCase())
                );
                setMentionSuggestions(filtered);
                setShowSuggestions(true);
                return;
            }
        }

        setShowSuggestions(false);
    };

    const handleMentionSelect = (selectedUser) => {
        const textarea = textareaRef.current;
        const currentValue = value;
        const start = currentValue.lastIndexOf("@", cursorPosition - 1);
        const newText =
            currentValue.slice(0, start) +
            `@${selectedUser.fullName}` +
            currentValue.slice(cursorPosition);
        onChange(newText);
        setShowSuggestions(false);
        setTimeout(() => {
            const pos = start + selectedUser.fullName.length + 1;
            textarea.setSelectionRange(pos, pos);
            textarea.focus();
        }, 0);
    };
    return (
        <div className="relative">
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {showSuggestions && mentionSuggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded shadow-md mt-1 w-64 max-h-40 overflow-y-auto">
                    {mentionSuggestions.map((user) => (
                        <li
                            key={user._id}
                            onClick={() => handleMentionSelect(user)}
                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                        >
                            <img src={user.photoURL} alt="avatar" className="w-6 h-6 rounded-full" />
                            <span>{user.fullName}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MentionTextarea;

