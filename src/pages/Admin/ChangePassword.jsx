import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ChangePassword() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const token = useSelector((state) => state.token);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/v1/admin/user/password",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ username, password }),
                }
            );
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }
            toast.success(data.message);
            navigate("/admin");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-800 shadow-md">
            <h2 className="text-2xl text-gray-100 font-semibold mb-6 text-center">
                Update Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;
