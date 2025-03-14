import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
    const navigate = useNavigate();
    const [passwordError,setPasswordError]=useState("");

    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        if (!hasUppercase) {
            setPasswordError("Password must contain at least one uppercase letter.");
            return false;
        }

        if (!hasLowercase) {
            setPasswordError("Password must contain at least one lowercase letter.");
            return false;
        }

        if (!isLongEnough) {
            setPasswordError("Password must be at least 6 characters long.");
            return false;
        }

        setPasswordError("");
        return true;
    };
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const uname = form.uname.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(uname,email,password)
        if (!validatePassword(password)) {
            toast.error("Invalid password. Please check the requirements.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }
    };

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
                    
                    {/* ✅ Wrap inputs inside a form */}
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <input type="text" name="uname" placeholder="Username" className="input input-bordered w-full" required />
                        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
                        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />
                        
                        <motion.button
                            type="submit"
                            className="btn btn-primary w-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Register
                        </motion.button>
                    </form>
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
