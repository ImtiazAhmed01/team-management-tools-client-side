import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="flex min-h-screen items-center justify-center bg-gray-100 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                {/* Registration Form */}
                <motion.div
                    className="w-full md:w-1/2 p-6 md:p-8"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Registration</h2>
                    <div className="space-y-4">
                        <input type="text" name="uname" placeholder="Username" className="input input-bordered w-full" />
                        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" />
                        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" />
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
                    className="w-full md:w-1/2 bg-blue-500 text-white rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none flex flex-col items-center justify-center p-6 md:p-8"
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back!</h2>
                    <p className="text-sm mb-4 text-center">Already have an account?</p>
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
