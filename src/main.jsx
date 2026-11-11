import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'

import './index.css'
import Home from './pages/Home.jsx'
import NotFound from './pages/404.jsx'
import Projects from './pages/Projects.jsx'
import BppDev from './pages/project-details/BppDev.jsx'
import Eduwork from './pages/project-details/Eduwork.jsx'
import AnotherIsland from './pages/project-details/AnotherIsland.jsx'
import Duitra from './pages/project-details/Duitra.jsx'
import RailField from './pages/project-details/RailField.jsx'
import PageTransitionLayout from './components/PageTransitionLayout.jsx'

const router = createBrowserRouter([
  {
    element: <PageTransitionLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/projects", element: <Projects /> },
      { path: "/project/balikpapan-dev", element: <BppDev /> },
      { path: "/project/eduwork", element: <Eduwork /> },
      { path: "/project/another-island", element: <AnotherIsland /> },
      { path: "/project/another-day-in-the-island", element: <AnotherIsland /> },
      { path: "/project/duitra-apps", element: <Duitra /> },
      { path: "/project/duitra", element: <Duitra /> },
      { path: "/project/railfield", element: <RailField /> },
      { path: "/project/railfield-monitoring", element: <RailField /> },
      { path: "/404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
