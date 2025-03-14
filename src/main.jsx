import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Component/Login/Login'
import App from './App'
import Register from './Component/Register/Register'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <App></App>,
      },
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
    <RouterProvider router={router}> </RouterProvider>
  </StrictMode >,
)
