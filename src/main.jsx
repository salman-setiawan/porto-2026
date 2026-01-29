import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider, } from 'react-router-dom'

import './index.css'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "*", element: <Navigate to="/404" replace /> },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
