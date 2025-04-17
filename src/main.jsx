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
//import Eid from "./Component/Eid-Greetings/Eid";
import MyTask from "./Component/Task/MyTask";
import Image from "./Component/Imagesfile/Image";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



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
      {
        path: "/mytask",
        element: <MyTask></MyTask>
      },
      {
        path: "/image",
        element: <Image></Image>
      }
    ],

  },
]);
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(


  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
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
    </QueryClientProvider>
  </StrictMode>
);
