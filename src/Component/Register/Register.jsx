import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1dszzFMxoJ_6h0-Opyc6QVv_hizhQZAA",
    authDomain: "team-management-tool.firebaseapp.com",
    projectId: "team-management-tool",
    storageBucket: "team-management-tool.firebasestorage.app",
    messagingSenderId: "560359473161",
    appId: "1:560359473161:web:24702442422031c2a238d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Register = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="flex h-screen items-center justify-center bg-gray-100 container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="bg-white rounded-2xl shadow-lg flex w-4/5 max-w-4xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* Registration Form */}
                <motion.div
                    className="w-1/2 p-8"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-4">Registration</h2>
                    <div className="space-y-4">
                        <input type="text" placeholder="Username" className="input input-bordered w-full" />
                        <input type="email" placeholder="Email" className="input input-bordered w-full" />
                        <input type="password" placeholder="Password" className="input input-bordered w-full" />
                        <motion.button
                            className="btn btn-primary w-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Register
                        </motion.button>
                    </div>
                </motion.div>

                {/* Welcome Back Section */}
                <motion.div
                    className="w-1/2 bg-blue-500 text-white rounded-r-2xl flex flex-col items-center justify-center p-8"
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                    <p className="text-sm mb-4">Already have an account?</p>
                    <motion.button
                        className="btn btn-outline text-white border-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/")}
                    >
                        Login
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Register;