import { Link } from "react-router-dom";

function AdminDashBoard() {
    return (
        <div className="flex justify-center p-4">
            <ul className="flex flex-col p-2 w-full max-w-4xl">
                <li className="my-2">
                    <Link
                        to='/admin/register-teacher'
                        className="block p-3 text-center text-3xl text-gray-200 bg-gray-800 hover:bg-gray-700 transition duration-300 border rounded-lg"
                    >
                        Register Teacher
                    </Link>
                </li>
                <li className="my-2">
                    <Link
                        to='/admin/filter-students'
                        className="block p-3 text-center text-3xl text-gray-200 bg-gray-800 hover:bg-gray-700 transition duration-300 border rounded-lg"
                    >
                        Filter Student
                    </Link>
                </li>
                <li className="my-2">
                    <Link
                        to='/admin/change-password'
                        className="block p-3 text-center text-3xl text-gray-200 bg-gray-800 hover:bg-gray-700 transition duration-300 border rounded-lg"
                    >
                        Change Password
                    </Link>
                </li>
                <li className="my-2">
                    <Link
                        to='/admin/add-result'
                        className="block p-3 text-center text-3xl text-gray-200 bg-gray-800 hover:bg-gray-700 transition duration-300 border rounded-lg"
                    >
                        Add Result
                    </Link>
                </li>
            </ul>
        </div>

    );
}

export default AdminDashBoard;