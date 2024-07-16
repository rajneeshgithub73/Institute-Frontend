import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = ({ userDetails }) => {
  const studentStatus = useSelector(state => state.isStudent)
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-800 shadow-md">
      <div className="flex flex-col items-center">
        <img
          className="w-32 h-32 rounded-full border-2 border-gray-300"
          src={userDetails.avatar}
          alt={`${userDetails.fullName}'s avatar`}
        />
        <h1 className="mt-4 text-2xl font-semibold text-gray-100">
          {userDetails.fullName}
        </h1>
        <p className="mt-1 text-gray-100">@{userDetails.username}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-medium text-gray-300">
            Personal Information
          </h2>
          <p className="mt-2 text-gray-200">
            <strong>Full Name:</strong> {userDetails.fullName}
          </p>
          <p className="mt-2 text-gray-200">
            <strong>Father's Name:</strong> {userDetails.fatherName}
          </p>
          <p className="mt-2 text-gray-200">
            <strong>Date of Birth:</strong> {userDetails.dob.toLocaleString()}
          </p>
          <p className="mt-2 text-gray-200">
            <strong>Age:</strong> {userDetails.age}
          </p>
          <p className="mt-2 text-gray-200">
            <strong>Address:</strong> {userDetails.address}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-300">
            Contact Information
          </h2>
          <p className="mt-2 text-gray-200">
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p className="mt-2 text-gray-200">
            <strong>Phone:</strong> {userDetails.phone}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-300">
            Academic Information
          </h2>
          <p className="mt-2 text-gray-200">
            <strong>Grade:</strong> {studentStatus ? userDetails.gradeValue : userDetails.gradeValues.join(',')}
          </p>
          <p className="mt-2 text-gray-200">
            <strong>Subjects:</strong> {userDetails.subjectNames.join(", ")}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-300">Account Status</h2>
          <p className="mt-2 text-gray-200">
            <strong>Verified:</strong> {userDetails.isVerified ? "Yes" : "No"}
          </p>
          <p className="mt-2 text-gray-200">
            <strong>Created At:</strong>{" "}
            {new Date(userDetails.createdAt).toLocaleString()}
          </p>
          <p className="mt-2 text-gray-200">
            <strong>Updated At:</strong>{" "}
            {new Date(userDetails.updatedAt).toLocaleString()}
          </p>
        </div>
        <div>
          <Link
            to={studentStatus ? "/student-profile/update" : "/teacher-profile/update" }
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
