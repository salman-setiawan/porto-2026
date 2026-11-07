import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'

import './index.css'
import Home from './pages/Home.jsx'
import NotFound from './pages/404.jsx'

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <Navigate to="/404" replace /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
