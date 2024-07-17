import { useEffect, useState } from "react";
import toast from "react-hot-toast"

function AddGrade() {

    const [gradeValue, setGradeValue] = useState(6);
    const [subjectNames, setSubjectNames] = useState([]);

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/v1/subject/subject-list', {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setSubjects(data.data)
            });
    }, []);

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
        // teacherData.append("gradeValue", gradeValue);
        // subjectNames.forEach((subjectName) => teacherData.append("subjectNames", subjectName));
        // Log FormData content for debugging
        // for (let pair of teacherData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        // }

        try {
            const response = await fetch(
                "http://localhost:5000/api/v1/grade/add",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({gradeValue, subjectNames}),
                }
            );
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-800 shadow-md">
            <h2 className="text-2xl text-gray-100 font-semibold mb-6 text-center">
                Add Grade
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddGrade;