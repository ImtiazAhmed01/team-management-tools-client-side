import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Component/Login/Login'
import App from './App'
import Register from './Component/Register/Register'

import { ToastContainer } from 'react-toastify'
import AuthProvider from './Component/provider/authProvider'
import Home from './Component/pages/Home/Home'
import Task from './Component/Task/Task'
import Profile from "./Component/Profile/Profile";
// import Eid from "./Component/Eid-Greetings/Eid";


const router = createBrowserRouter([

  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {

        path: "/Tasks",
        element: <Task></Task>,
      },
      {
        path: "/user",
        element: <Profile></Profile>
      },
    ],
  
  },
]);
createRoot(document.getElementById("root")).render(


  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}> </RouterProvider>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="bounce"
      />
    </AuthProvider>
  </StrictMode>
);
