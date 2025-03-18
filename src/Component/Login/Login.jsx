import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/authProvider";
import { toast } from "react-toastify"; // Assuming you are using toast notifications
import { Bounce } from "react-toastify"; // Import toast transitions if needed

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext); // Get Auth functions from context
    const [showPassword, setShowPassword] = useState(false);
    const emailref = useRef();
    const navigate = useNavigate();

    // Handle Google Sign In
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
            toast.success('Login successful!', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            toast.error('Google login failed. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    // Handle Email/Password Login
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            toast.error('Please enter both email and password.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        try {
            await signInUser(email, password);
            navigate('/');
            toast.success('Login successful!', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            toast.error('Invalid email or password. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    // Handle Forget Password
    const handleForgetPassword = () => {
        const email = emailref.current.value;
        if (!email) {
            alert('Please provide a valid email address');
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Password reset email sent. Please check your email.");
                })
                .catch((error) => {
                    alert("Error sending password reset email.");
                });
        }
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-300 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="flex flex-col md:flex-row w-full max-w-3xl shadow-lg rounded-lg overflow-hidden bg-white"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* Left Side */}
                <motion.div
                    className="w-full md:w-1/2 bg-blue-500 flex flex-col items-center justify-center p-10 text-white"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold text-center">Hello, Welcome!</h2>
                    <p className="mt-2 text-center">Don't have an account?</p>
                    <motion.button
                        className="mt-4 px-6 py-2 border border-white rounded-full transform transition duration-300 hover:scale-95 active:scale-90"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </motion.button>
                </motion.div>

                {/* Right Side (Login Form) */}
                <motion.div
                    className="w-full md:w-1/2 bg-white p-6 md:p-10"
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-xl font-bold text-gray-700 text-center">Login</h2>
                    <div className="mt-6">
                        <form onSubmit={handleLogin}>
                            <div className="relative mb-4">
                                <input
                                    type="email"
                                    name="email"
                                    ref={emailref}
                                    placeholder="Email"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="relative mb-4">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                                    required
                                />
                            </div>
                            <p
                                className="text-right text-blue-500 text-sm cursor-pointer"
                                onClick={handleForgetPassword}
                            >
                                Forgot Password?
                            </p>
                            <motion.button
                                type="submit"
                                className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Login
                            </motion.button>
                        </form>

                        <div className="mt-4 text-center">
                            <motion.button
                                onClick={handleGoogleSignIn}
                                className="w-full flex gap-5 mt-4 bg-purple-600 text-white py-2 rounded-md animate-bounce"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img width="30" height="30" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" /> Login with Google
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Login;
