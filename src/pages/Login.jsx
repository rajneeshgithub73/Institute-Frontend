import { useState } from "react";
import { useDispatch } from "react-redux";
import { authLogin } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentLogin = async (e) => {
    e.preventDefault();

    const student = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/student/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch(
        authLogin({
          isStudent: true,
          isTeacher: false,
          isAdmin: false,
          userData: data.data.studentLoggedIn,
          token: data.data.accessToken,
        })
      );
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const teacherLogin = async (e) => {
    e.preventDefault();

    const teacher = {
      username: username,
      password: password,
    };

    // console.log(teacher);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/teacher/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(teacher),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch(
        authLogin({
          isStudent: false,
          isTeacher: true,
          isAdmin: data.data.teacherLoggedIn.isAdmin,
          userData: data.data.teacherLoggedIn,
          token: data.data.accessToken,
        })
      );

      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 pt-28 pb-28 bg-gray-800 shadow-md flex flex-col justify-center">
      <h2 className="text-2xl text-gray-100 font-semibold mb-6 text-center">
        Login
      </h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-100"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-100"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="flex justify-center w-full">
          <button
            type="submit"
            onClick={studentLogin}
            className="px-4 py-2 m-1 w-full bg-blue-600 text-white rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Student
          </button>
          <button
            type="submit"
            onClick={teacherLogin}
            className="px-4 py-2 m-1 w-full bg-blue-600 text-white rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Teacher
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
