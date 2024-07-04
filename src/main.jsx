import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/student-home',
        element: <StudentHome />
      },
      {
        path: '/student-profile/:id',
        element: <StudentProfile />
      },
      {
        path: '/student-profile/update/:id',
        element: <StudentProfileUpdate />
      },
      {
        path: '/teacher-home',
        element: <TeacherHome />
      },
      {
        path: '/teacher-profile/:id',
        element: <TeacherProfile />
      },
      {
        path: '/teacher-profile/update/:id',
        element: <TeacherProfileUpdate />
      },
      {
        path: '/announcement',
        element: <Announcement />
      },
      {
        path: '/announcement/:id',
        element: <ViewAnnouncement />
      },
      {
        path: '/announcement/add',
        element: <AddAnnouncement />
      },
      {
        path: '/notes',
        element: <Notes />
      },
      {
        path: '/notes/:grade',
        element: <GradeNotes />
      },
      {
        path: '/notes/:grade/:subject',
        element: <SubjectGradeNotes />
      },
      {
        path: '/admin',
        element: <AdminDashBoard />
      },
      {
        path: '/admin/registerTeacher',
        element: <RegisterTeacher />
      },
      {
        path: '/admin/verifystudent',
        element: <VerifyStudent />
      },
      {
        path: '/admin/addnotes',
        element: <AddNotes />
      },
      {
        path: '/admin/addresult',
        element: <AddResult />
      },
      {
        path: '/class-chat',
        element: <ClassChat />
      },
      {
        path: '/universal-chat',
        element: <UniversalChat />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
