import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import AddAnnouncement from './components/AddAnnouncement.jsx'
import Announcement from './pages/Announcement.jsx'
import ViewAnnouncement from './pages/ViewAnnouncement.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import ClassChat from './pages/ClassChat.jsx'
import UniversalChat from './pages/UniversalChat.jsx'
import Notes from './pages/Notes.jsx'
import StudentProfile from './pages/StudentProfile.jsx'
import TeacherProfile from './pages/TeacherProfile.jsx'


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
      // {
      //   path: '/student-home',
      //   element: <StudentHome />
      // },
      {
        path: '/student-profile',
        element: <StudentProfile />
      },
      // {
      //   path: '/student-profile/update',
      //   element: <StudentProfileUpdate />
      // },
      // {
      //   path: '/teacher-home',
      //   element: <TeacherHome />
      // },
      {
        path: '/teacher-profile',
        element: <TeacherProfile />
      },
      // {
      //   path: '/teacher-profile/update/:id',
      //   element: <TeacherProfileUpdate />
      // },
      {
        path: '/announcement',
        element: <Announcement />
      },
      {
        path: '/announcement/:id',
        element: <ViewAnnouncement />
      },
      {
        path: '/notes',
        element: <Notes />
      },
      // {
      //   path: '/notes/:grade',
      //   element: <GradeNotes />
      // },
      // {
      //   path: '/notes/:grade/:subject',
      //   element: <SubjectGradeNotes />
      // },
      // {
      //   path: '/admin',
      //   element: <AdminDashBoard />
      // },
      // {
      //   path: '/admin/registerTeacher',
      //   element: <RegisterTeacher />
      // },
      // {
      //   path: '/admin/verifystudent',
      //   element: <VerifyStudent />
      // },
      // {
      //   path: '/admin/addnotes',
      //   element: <AddNotes />
      // },
      // {
      //   path: '/admin/addresult',
      //   element: <AddResult />
      // },
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
