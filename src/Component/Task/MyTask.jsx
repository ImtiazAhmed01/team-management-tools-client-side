
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaLink } from 'react-icons/fa';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { AuthContext } from '../provider/authProvider';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [reaction, setReaction] = useState({ likeCount: 0, disLikeCount: 0 });
    const [activeReaction, setActiveReaction] = useState(null);
    const [updatingTaskId, setUpdatingTaskId] = useState(null);




    return (
        <div className="space-y-6 p-4">

        </div>
    );
};

export default MyTask;




