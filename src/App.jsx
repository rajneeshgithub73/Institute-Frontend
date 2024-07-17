import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Student/Register.jsx";
import Login from "./pages/Login.jsx";
import Announcement from "./pages/Announcement/Announcement.jsx";
import ViewAnnouncement from "./pages/Announcement/ViewAnnouncement.jsx";
import ClassChat from "./pages/Chat/ClassChat.jsx";
import UniversalChat from "./pages/Chat/UniversalChat.jsx";
import Notes from "./pages/Notes/Notes.jsx";
import StudentProfile from "./pages/Student/StudentProfile.jsx";
import TeacherProfile from "./pages/Teacher/TeacherProfile.jsx";
import RegisterTeacher from "./pages/Teacher/RegisterTeacher.jsx";
import AdminDashBoard from "./pages/Admin/AdminDashBoard.jsx";
import FilterStudents from "./pages/Admin/FilterStudents.jsx";
import AddResult from "./pages/Admin/AddResult.jsx";
import StudentProfileUpdate from "./pages/Student/StudentProfileUpdate.jsx";
import TeacherProfileUpdate from "./pages/Teacher/TeacherProfileUpdate.jsx";
import FeedBack from "./components/FeedBack.jsx";
import SubjectNotes from "./pages/Notes/SubjectNotes.jsx";
import ViewNotes from "./pages/Notes/ViewNotes.jsx";
import ChangePassword from "./pages/Admin/ChangePassword.jsx";
import { useSelector } from "react-redux";
import Results from "./pages/Results/Results.jsx";

function App() {
  const authStatus = useSelector((state) => state.status);
  const studentStatus = useSelector((state) => state.isStudent);
  const teacherStatus = useSelector((state) => state.isTeacher);
  const adminStatus = useSelector((state) => state.isAdmin);

  return (
    <div className="min-w-full min-h-fit bg-red-600">
      <div className="min-w-full min-h-fit">
        <Header />
      </div>
      <div className="min-w-full min-h-fit">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!authStatus ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!studentStatus ? <Register /> : <Navigate to={"/"} />}
          />
          <Route
            path="/student-profile"
            element={
              studentStatus ? <StudentProfile /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/student-profile/update"
            element={
              studentStatus ? (
                <StudentProfileUpdate />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/teacher-profile"
            element={
              teacherStatus ? <TeacherProfile /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/teacher-profile/update"
            element={
              teacherStatus ? (
                <TeacherProfileUpdate />
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/announcement"
            element={authStatus ? <Announcement /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/announcement/:id"
            element={
              authStatus ? <ViewAnnouncement /> : <Navigate to={"/login"} />
            }
          />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:subjectName" element={<SubjectNotes />} />
          <Route
            path="/notes/:id"
            element={authStatus ? <ViewNotes /> : <Navigate to={"/login"} />}
          />
          <Route path="/results" element={<Results />} />
          <Route
            path="/admin"
            element={
              adminStatus ? <AdminDashBoard /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/admin/register-teacher"
            element={
              adminStatus ? <RegisterTeacher /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/admin/filter-students"
            element={
              adminStatus ? <FilterStudents /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/admin/change-password"
            element={
              adminStatus ? <ChangePassword /> : <Navigate to={"/login"} />
            }
          />
          <Route
            path="/admin/add-result"
            element={adminStatus ? <AddResult /> : <Navigate to={"/login"} />}
          />
          <Route path="/class-chat" element={<ClassChat />} />
          <Route path="/universal-chat" element={<UniversalChat />} />
          <Route
            path="/feedback"
            element={authStatus ? <FeedBack /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </div>
      <div className="min-w-full min-h-fit">
        <Footer />
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
