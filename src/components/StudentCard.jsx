import React from 'react';

const StudentCard = ({ student, onDelete, onToggleVerify }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 m-2 w-full sm:w-1/2 lg:w-1/3">
      <div className="flex items-center">
        <img src={student.avatar} alt={student.fullName} className="w-24 h-24 rounded-md mr-4" />
        <div>
          <h2 className="text-xl font-semibold">{student.fullName}</h2>
          <p className="text-gray-600">@{student.username}</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          className={`px-4 py-2 rounded-md text-white ${student.isVerified ? 'bg-green-500' : 'bg-red-500'}`}
          onClick={() => onToggleVerify(student._id)}
        >
          {student.isVerified ? 'Verified' : 'Not Verified'}
        </button>
        <button
          className="ml-4 px-4 py-2 rounded-md bg-red-600 text-white"
          onClick={() => onDelete(student._id)}
        >
          Delete Student
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
