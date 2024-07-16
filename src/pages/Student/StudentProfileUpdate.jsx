import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function StudentProfileUpdate() {
    const studentDetails = useSelector((state) => state.user);

    const [fullName, setFullName] = useState(studentDetails.fullName);
    const [fatherName, setFatherName] = useState(studentDetails.fatherName);
    const [username, setUsername] = useState(studentDetails.username);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState(studentDetails.email);
    const [age, setAge] = useState(studentDetails.age);
    const [dob, setDob] = useState(studentDetails.dob);
    const [phone, setPhone] = useState(studentDetails.phone);
    const [address, setAddress] = useState(studentDetails.address);
    const [avatar, setAvatar] = useState(null);
    const [gradeValue, setGradeValue] = useState(studentDetails.gradeValue);
    const [subjectNames, setSubjectNames] = useState(studentDetails.subjectNames);

    const [subjects, setSubjects] = useState([]);

    const token = useSelector((state) => state.token);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/grade/subjects/${gradeValue}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => setSubjects(data.data));
    }, [gradeValue, setGradeValue]);

    const handleSubjectChange = (name) => {
        setSubjectNames((prev) => {
            if (prev.includes(name)) {
                return prev.filter((subjectName) => subjectName !== name);
            } else {
                return [...prev, name];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // formData.append("fullName", fullName);
        // formData.append("fatherName", fatherName);
        // formData.append("username", username);
        formData.append("oldPassword", oldPassword);
        formData.append("newPassword", newPassword);
        // formData.append("email", email);
        // formData.append("age", age);
        // formData.append("dob", dob);
        // formData.append("phone", phone);
        // formData.append("address", address);
        // formData.append("avatar", avatar);
        // formData.append("gradeValue", gradeValue);
        subjectNames.forEach((subjectName) =>
            formData.append("subjectNames", subjectName)
        );

        // Log FormData content for debugging
        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        // }

        try {
            // throw new Error("FormData")
            const response = await fetch(
                "http://localhost:5000/api/v1/student/update",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ oldPassword, newPassword, subjectNames }),
                }
            );
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }
            toast.success(data.message);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-800 shadow-md">
            <h2 className="text-2xl text-gray-100 font-semibold mb-6 text-center">
                Update Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        disabled={true}
                    />
                </div>
                <div>
                    <label
                        htmlFor="fatherName"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Father's Name
                    </label>
                    <input
                        type="text"
                        name="fatherName"
                        id="fatherName"
                        value={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        disabled={true}
                    />
                </div>
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
                        disabled={true}
                    />
                </div>
                <div>
                    <label
                        htmlFor="oldPassword"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Old Password
                    </label>
                    <input
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <label
                        htmlFor="newpassword"
                        className="block text-sm font-medium text-gray-100"
                    >
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        disabled={true}
                    />
                </div>
                <div>
                    <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Age
                    </label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        disabled={true}
                    />
                </div>
                <div>
                    <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        disabled={true}
                    />
                </div>
                <div>
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Phone
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        disabled={true}
                    />
                </div>
                <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Address
                    </label>
                    <textarea
                        name="address"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        disabled={true}
                    ></textarea>
                </div>
                <div>
                    <label
                        htmlFor="avatar"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Avatar
                    </label>
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={(e) => setAvatar(e.target.files[0])}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        disabled={true}
                    />
                </div>
                <div>
                    <label
                        htmlFor="grade"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Grade
                    </label>
                    <select
                        name="grade"
                        id="grade"
                        value={gradeValue}
                        onChange={(e) => setGradeValue(e.target.value)}
                        required
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        disabled={true}
                    >
                        <option value={6}>6th Grade</option>
                        <option value={7}>7th Grade</option>
                        <option value={8}>8th Grade</option>
                        <option value={9}>9th Grade</option>
                        <option value={10}>10th Grade</option>
                        <option value={11}>11th Grade</option>
                        <option value={12}>12th Grade</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-100">
                        Subjects
                    </label>
                    <div className="mt-1 space-y-2">
                        {subjects.map((subject) => (
                            <div key={subject} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="subjects"
                                    id={`subject-${subject}`}
                                    value={subject}
                                    checked={subjectNames.includes(subject)}
                                    onChange={() => handleSubjectChange(subject)}
                                    className="mr-2"
                                />
                                <label htmlFor={`subject-${subject}`} className="text-gray-100">
                                    {subject}
                                </label>
                            </div>
                        ))}
                    </div>
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

export default StudentProfileUpdate;
