import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Announcement from './pages/Announcement.jsx'
import ViewAnnouncement from './pages/ViewAnnouncement.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import ClassChat from './pages/ClassChat.jsx'
import UniversalChat from './pages/UniversalChat.jsx'
import Notes from './pages/Notes.jsx'
import StudentProfile from './pages/StudentProfile.jsx'
import TeacherProfile from './pages/TeacherProfile.jsx'
import Test from './pages/Test.jsx'
import RegisterTeacher from './pages/RegisterTeacher.jsx'
import AdminDashBoard from './pages/AdminDashBoard.jsx'
import FilterStudents from './pages/FilterStudents.jsx'
import AddResult from './pages/AddResult.jsx'
import StudentProfileUpdate from './pages/StudentProfileUpdate.jsx'
import TeacherProfileUpdate from './pages/TeacherProfileUpdate.jsx'
import Feedback from './components/FeedBack.jsx'
import SubjectNotes from './pages/SubjectNotes.jsx'
import ChapterNotes from './pages/ChapterNotes.jsx'
import ChangePassword from './pages/ChangePassword.jsx'


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
        path: '/test',
        element: <Test />
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
        path: '/student-profile',
        element: <StudentProfile />
      },
      {
        path: '/student-profile/update',
        element: <StudentProfileUpdate />
      },
      {
        path: '/teacher-profile',
        element: <TeacherProfile />
      },
      {
        path: '/teacher-profile/update/',
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
        path: '/notes',
        element: <Notes />
      },
      {
        path: '/notes/:subjectName',
        element: <SubjectNotes />
      },
      {
        path: '/notes/:id',
        element: <ChapterNotes />
      },
      {
        path: '/admin',
        element: <AdminDashBoard />
      },
      {
        path: '/admin/register-teacher',
        element: <RegisterTeacher />
      },
      {
        path: '/admin/filter-students',
        element: <FilterStudents />
      },
      {
        path: '/admin/change-password',
        element: <ChangePassword />
      },
      {
        path: '/admin/add-result',
        element: <AddResult />
      },
      {
        path: '/class-chat',
        element: <ClassChat />
      },
      {
        path: '/universal-chat',
        element: <UniversalChat />
      },
      {
        path:'/feedback',
        element: <Feedback />
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
