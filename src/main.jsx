import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from 'react-router-dom'
import App from './App.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import './index.css'

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/blog', element: <Blog /> },
      { path: '/blog/:slug', element: <BlogPost /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
