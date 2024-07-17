import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const TeacherProfileUpdate = () => {

    const teacherDetails = useSelector(state => state.user)

    const [fullName, setFullName] = useState(teacherDetails.fullName);
    const [fatherName, setFatherName] = useState(teacherDetails.fatherName);
    const [username, setUsername] = useState(teacherDetails.username);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState(teacherDetails.email);
    const [age, setAge] = useState(teacherDetails.age);
    const [dob, setDob] = useState(teacherDetails.dob);
    const [phone, setPhone] = useState(teacherDetails.phone);
    const [address, setAddress] = useState(teacherDetails.address);
    const [avatar, setAvatar] = useState(null);
    const [gradeValues, setGradeValues] = useState(teacherDetails.gradeValues);
    const [subjectNames, setSubjectNames] = useState(teacherDetails.subjectNames);

    const [grades, setGrades] = useState([6, 7, 8, 9, 10, 11, 12]);
    const [subjects, setSubjects] = useState([]);

    const navigate = useNavigate();
    const token = useSelector(state => state.token)

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/subject/subject-list', {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                setSubjects(data.data)
            });
    }, []);

    const handleGradeChange = (grade) => {
        setGradeValues((prev) => {
            if (prev.includes(grade)) {
                return prev.filter((gradeValue) => gradeValue !== grade);
            } else {
                return [...prev, grade];
            }
        });
    };

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

        // const teacherData = new FormData();
        // teacherData.append("fullName", fullName);
        // teacherData.append("fatherName", fatherName);
        // teacherData.append("username", username);
        // teacherData.append("oldPassword", oldPassword);
        // teacherData.append("newPassword", newPassword);
        // teacherData.append("email", email);
        // teacherData.append("age", age);
        // teacherData.append("dob", dob);
        // teacherData.append("phone", phone);
        // teacherData.append("address", address);
        // teacherData.append("avatar", avatar);
        // gradeValues.forEach((gradeValue) => teacherData.append("gradeValues", gradeValue));
        // subjectNames.forEach((subjectName) => teacherData.append("subjectNames", subjectName));
        // Log FormData content for debugging
        // for (let pair of teacherData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        // }

        try {
            const response = await fetch(
                "http://localhost:5000/api/v1/teacher/update",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({oldPassword, newPassword, gradeValues, subjectNames}),
                }
            );
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }
            toast.success(data.message);
            navigate("/teacher-profile");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-800 shadow-md">
            <h2 className="text-2xl text-gray-100 font-semibold mb-6 text-center">
                Register Teacher
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-100"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
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
                        htmlFor="newPassword"
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
                    <label className="block text-sm font-medium text-gray-100">
                        Classes
                    </label>
                    <div className="mt-1 space-y-2">
                        {grades.map((grade) => (
                            <div key={grade} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="grades"
                                    id={`${grade}`}
                                    value={grade}
                                    checked={gradeValues.includes(grade)}
                                    onChange={() => handleGradeChange(grade)}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor={`${grade}`}
                                    className="text-gray-100"
                                >
                                    {grade}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-100">
                        Subjects
                    </label>
                    <div className="mt-1 space-y-2">
                        {subjects.map((subject) => (
                            <div key={subject._id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="subjects"
                                    id={`subject-${subject._id}`}
                                    value={subject.subjectName}
                                    checked={subjectNames.includes(subject.subjectName)}
                                    onChange={() => handleSubjectChange(subject.subjectName)}
                                    className="mr-2"
                                />
                                <label
                                    htmlFor={`subject-${subject._id}`}
                                    className="text-gray-100"
                                >
                                    {subject.subjectName}
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
};

export default TeacherProfileUpdate;
