import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../provider/authProvider";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";  // Import Firebase functions

const Register = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(""); // For password error validation

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
            toast.success("User created successfully by Google sign in!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            console.error("Google login failed:", error.message);
        }
    };

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

        setPasswordError(""); // Reset password error if validation passes
        return true;
    };

    // const handleRegister = async (e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const uname = form.uname.value;
    //     const email = form.email.value;
    //     const password = form.password.value;

    //     // Validate password
    //     if (!validatePassword(password)) {
    //         toast.error("Invalid password. Please check the requirements.", {
    //             position: "top-center",
    //             autoClose: 5000,
    //             theme: "light",
    //             transition: Bounce,
    //         });
    //         return;
    //     }

    //     try {
    //         const auth = getAuth();
    //         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //         const user = userCredential.user;

    //         // Update user profile
    //         await updateProfile(user, {
    //             displayName: uname,  // Using username
    //         });

    //         localStorage.setItem(
    //             "userProfile",
    //             JSON.stringify({
    //                 displayName: uname,
    //                 email: user.email,
    //                 uname,
    //             })
    //         );

    //         toast.success("User created successfully!", {
    //             position: "top-center",
    //             autoClose: 5000,
    //             theme: "light",
    //             transition: Bounce,
    //         });

    //         navigate("/"); // Redirect to home page
    //     } catch (error) {
    //         console.error("Error creating user:", error.message);
    //         toast.error("Error creating user. Please try again.", {
    //             position: "top-center",
    //             autoClose: 5000,
    //             theme: "light",
    //             transition: Bounce,
    //         });
    //     }
    // };

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const uname = form.uname.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!validatePassword(password)) {
            toast.error("Invalid password. Please check the requirements.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: uname,
            });

            const userData = {
                username: uname,
                email: email,
                from_register: true,
                userrole: "member",
                userimage: "n/a",
                profession: "n/a",
                year_of_experience: "n/a"
            };

            await fetch("https://teammanagementtools.vercel.app/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            })
                .then(response => response.json())
                .then(data => console.log("Response from server:", data))
                .catch(error => console.error("Error sending request:", error));

            toast.success("User created successfully!", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });

            navigate("/");
        } catch (error) {
            console.error("Error creating user:", error.message);
            toast.error("Error creating user. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
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

                    {/* Wrap inputs inside a form */}
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <input type="text" name="uname" placeholder="Username" className="input input-bordered w-full" required />
                        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            required
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="text-sm text-blue-500 ">
                            {showPassword ? "Hide Password" : "Show Password"}
                        </button>

                        <motion.button
                            type="submit"
                            className="btn btn-primary w-full  bg-blue-500"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Register
                        </motion.button>
                    </form>

                    {/* Google Sign-In Button */}
                    <div className="mt-4">
                        <motion.button
                            className="btn btn-outline w-full bg-purple-500 animate-bounce"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleGoogleSignIn}
                        >
                            <img width="30" height="30" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />Sign Up with Google
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
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Register;
