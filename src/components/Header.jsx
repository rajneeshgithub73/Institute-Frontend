import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import { MdMenu } from "react-icons/md";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const authStatus = useSelector((state) => state.status)
    const studentStatus = useSelector((state) => state.isStudent)
    const teacherStatus = useSelector((state) => state.isTeacher)
    const adminStatus = useSelector((state) => state.isAdmin)
    const user = useSelector((state) => state.user)

    console.table([authStatus, studentStatus, teacherStatus, adminStatus])

    return (
        <nav className="border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MC</span>
                </Link>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded={isDropdownOpen}
                        onClick={toggleDropdown}
                    >
                        <span className="sr-only">Open user menu</span>
                        <MdAccountCircle className="w-8 h-8 rounded-full bg-slate-400" />
                    </button>

                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded={isOpen}
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <MdMenu className='w-12 h-12' />
                    </button>
                </div>
                <div className={`items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
                    <ul className="flex flex-col font-medium p-2 md:p-0 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                        </li>
                        {
                            authStatus && (
                                <li>
                                    <Link to="/announcement" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Announcements</Link>
                                </li>
                            )
                        }
                        <li>
                            <Link to="/notes" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Notes</Link>
                        </li>
                        <li>
                            <Link to="/result" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Result</Link>
                        </li>
                        <li>
                            <Link to="/class-chat" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">ClassChat</Link>
                        </li>
                        <li>
                            <Link to="/universal-chat" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">AllChat</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {isDropdownOpen && (
                <div className="absolute right-0 top-16 w-40 z-50 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-900 dark:divide-gray-600 rounded-b" id="user-dropdown">
                    {
                        authStatus && (
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">{user.fullName}</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.username}</span>
                            </div>
                        )
                    }

                    <ul className="py-1" aria-labelledby="user-menu-button">
                        {
                            authStatus && studentStatus && (
                                <li>
                                    <Link to="/student-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                                </li>
                            )
                        }
                        {
                            authStatus && teacherStatus && (
                                <li>
                                    <Link to="/teacher-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</Link>
                                </li>
                            )
                        }
                        {
                            !authStatus && (
                                <li>
                                    <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Login</Link>
                                </li>
                            )
                        }
                        {
                            !authStatus && (
                                <li>
                                    <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Signup</Link>
                                </li>
                            )
                        }
                        {
                            authStatus && teacherStatus && adminStatus && (
                                <li>
                                    <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Admin</Link>
                                </li>
                            )
                        }
                        {
                            authStatus && (
                                <li>
                                    <Link to="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Header;
