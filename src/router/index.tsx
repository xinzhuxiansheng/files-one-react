import { createHashRouter, createBrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import Welcome from '@/views/welcome'
import Layout from '@/layout'
const route = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      }
    ]
  }
]

export default function Router() {
  return useRoutes(route)
}
