import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState(0);
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [gradeValue, setGradeValue] = useState(6);
    const [subjectIds, setSubjectIds] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/grade/subjects/${gradeValue}`, {
            method: "GET",
        }).then(response => response.json()).then((data) => {
            setSubjects(data.gradeSubjectDetails[0].subject_details)
        })
    }, [gradeValue, setGradeValue])

    // const subjects = [
    //     { id: 1, name: "Mathematics" },
    //     { id: 2, name: "Science" },
    //     { id: 3, name: "History" },
    //     { id: 4, name: "Geography" },
    //     { id: 5, name: "English" },
    // ];

    const handleSubjectChange = (id) => {
        setSubjectIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((subjectId) => subjectId !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic
        // console.log({
        //   name,
        //   fathername,
        //   username,
        //   password,
        //   email,
        //   age,
        //   dob,
        //   phone,
        //   address,
        //   avatar,
        //   gradeValue,
        //   subjectIds,
        // });

        const formData = new FormData();
        formData.append('fullName', name);
        formData.append('fatherName', fatherName);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('age', age);
        formData.append('dob', dob);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('avatar', avatar);
        formData.append('gradeValue', gradeValue);
        subjectIds.forEach((subjectId) => formData.append('subjectIds', subjectId));

        console.table([name, fatherName, username, password, email, age, dob, phone, address, avatar, gradeValue, subjectIds])

        await fetch("http://localhost:5000/api/v1/student/register", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then((data) => { 
                if(data.student) {
                    navigate('/login')
                }
             })
            .catch((error) => {
                console.log(error)
            })
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-gray-800 shadow-md">
            <h2 className="text-2xl text-gray-100 font-semibold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-100">Name</label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="fatherName" className="block text-sm font-medium text-gray-100">Father's Name</label>
                    <input type="text" name="fatherName" id="fatherName" value={fatherName} onChange={(e) => setFatherName(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-100">Username</label>
                    <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-100">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-100">Age</label>
                    <input type="number" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-100">Date of Birth</label>
                    <input type="date" name="dob" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-100">Phone</label>
                    <input type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-100">Address</label>
                    <textarea name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
                </div>
                <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-100">Avatar</label>
                    <input type="file" name="avatar" id="avatar" onChange={(e) => setAvatar(e.target.files[0])} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                </div>
                <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-100">Grade</label>
                    <select name="grade" id="grade" value={gradeValue} onChange={(e) => setGradeValue(e.target.value)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full">
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
                    <label className="block text-sm font-medium text-gray-100">Subjects</label>
                    <div className="mt-1 space-y-2">
                        {subjects.map((subject) => (
                            <div key={subject._id} className="flex items-center">
                                <input type="checkbox" name="subjects" id={`subject-${subject._id}`} value={subject._id} checked={subjectIds.includes(subject._id)} onChange={() => handleSubjectChange(subject._id)} className="mr-2" />
                                <label htmlFor={`subject-${subject._id}`} className="text-gray-100">{subject.subjectName}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <button type="submit" className="px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
