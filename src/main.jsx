import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Component/Login/Login'


const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,

  }
])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={router}> </RouterProvider>
  </StrictMode >,
)
