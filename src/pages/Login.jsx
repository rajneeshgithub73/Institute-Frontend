import { useState } from "react";
import { useDispatch } from "react-redux";
import { authLogin } from "../store/authSlice";
import { useNavigate } from "react-router-dom";


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    console.table([username, password])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const studentLogin = async (e) => {
        e.preventDefault()

        const student = {
            username: username,
            password: password
        }

        await fetch('http://localhost:5000/api/v1/student/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        }).then(response => response.json()).then((data) => {
            dispatch(authLogin(
                {
                    isStudent: true,
                    isTeacher: false,
                    isAdmin: false,
                    userData: data.student.studentLoggedIn,
                    token: data.student.accessToken
                }
            ))
            navigate('/')
        }).catch(error => console.log(error))
    }

    const teacherLogin = async (e) => {
        e.preventDefault()

        const teacher = {
            username: username,
            password: password
        }

        await fetch('http://localhost:5000/api/v1/teacher/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teacher)
        }).then(response => response.json()).then((data) => {
            dispatch(authLogin(
                {
                    isStudent: false,
                    isTeacher: true,
                    isAdmin: data.teacher.isAdmin,
                    userData: data.teacher.teacherLoggedIn,
                    token: data.teacher.accessToken
                }
            ))
            navigate('/')
        }).catch(error => console.log(error))
    }

    return (
        <div className="max-w-lg mx-auto p-2 bg-gray-800 shadow-md">
            <h2 className="text-2xl text-gray-100 font-semibold mb-6 text-center">Login</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-100">Username</label>
                    <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-100">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div className="flex justify-center w-full">
                    <button type="submit" onClick={studentLogin} className="px-4 py-2 m-1 w-full bg-blue-600 text-white rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">Student</button>
                    <button type="submit" onClick={teacherLogin} className="px-4 py-2 m-1 w-full bg-blue-600 text-white rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">Teacher</button>
                </div>
            </form>
        </div>
    );
}

export default Login;