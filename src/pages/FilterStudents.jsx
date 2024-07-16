import { useEffect, useState } from "react";
import StudentCard from "../components/StudentCard";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function FilterstudentLists() {
    const [gradeValue, setGradeValue] = useState(11);
    const [isVerified, setIsVerified] = useState(false);

    const [studentList, setStudentList] = useState([]);

    const [showPopup, setShowPopup] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);  

    const token = useSelector((state) => state.token);

    useEffect(() => {
        fetch(
            `http://localhost:5000/api/v1/admin/student/filter?gradeValue=${gradeValue}&isVerified=${isVerified}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (!data.success) {
                    throw new Error(data.message);
                }
                setStudentList(data.data);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }, [gradeValue, isVerified]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/v1/admin/student/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }
            setStudentList(studentList.filter((student) => student._id !== id));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const openDeletePopup = (id) => {
        setStudentToDelete(id);
        setShowPopup(true);
    };

    const closeDeletePopup = () => {
        setShowPopup(false);
        setStudentToDelete(null);
    };

    const confirmDelete = () => {
        handleDelete(studentToDelete);
        closeDeletePopup();
    };

    const handleToggleVerify = async (id) => {
        try {
            console.log(id);
            const response = await fetch(
                `http://localhost:5000/api/v1/admin/student/verify/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!data.success) {
                console.log(data.message);
                throw new Error(data.message);
            }
            setStudentList(
                studentList.map((student) =>
                    student._id === id
                        ? { ...student, isVerified: !student.isVerified }
                        : student
                )
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="bg-gray-800 p-6">
            <div className="mt-2">
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
            <div className="mt-2">
                <label
                    htmlFor="verify"
                    className="block text-sm font-medium text-gray-100"
                >
                    Verified
                </label>
                <select
                    name="verify"
                    id="verify"
                    value={isVerified}
                    onChange={(e) => setIsVerified(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </div>
            <div className="flex flex-wrap justify-center mt-6">
                {studentList.map((student) => (
                    <div
                        key={student._id}
                        className="bg-white shadow-md rounded-md p-4 m-2 w-full sm:w-1/2 lg:w-1/3"
                    >
                        <div className="flex items-center">
                            <img
                                src={student.avatar}
                                alt={student.fullName}
                                className="w-24 h-24 rounded-md mr-4"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{student.fullName}</h2>
                                <p className="text-gray-600">@{student.username}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                className={`px-4 py-2 rounded-md text-white ${student.isVerified ? "bg-green-500" : "bg-red-500"
                                    }`}
                                onClick={() => handleToggleVerify(student._id)}
                            >
                                {student.isVerified ? "Verified" : "Not Verified"}
                            </button>
                            <button
                                className="ml-4 px-4 py-2 rounded-md bg-red-600 text-white"
                                onClick={() => openDeletePopup(student._id)}
                            >
                                Delete Student
                            </button>
                            {showPopup && (
                                <DeleteConfirmationPopup
                                    onConfirm={confirmDelete}
                                    onCancel={closeDeletePopup}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FilterstudentLists;

const DeleteConfirmationPopup = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center m-4 p-4 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="mb-6">Are you sure you want to delete this student?</p>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
