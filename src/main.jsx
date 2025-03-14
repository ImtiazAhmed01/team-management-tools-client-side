import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Component/Login/Login'
import App from './App'
import Register from './Component/Register/Register'
import AuthProvider from './Component/context/AuthProvider'
import { ToastContainer } from 'react-toastify'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },

    ]
  }
])

createRoot(document.getElementById('root')).render(

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
  </StrictMode >,
)
