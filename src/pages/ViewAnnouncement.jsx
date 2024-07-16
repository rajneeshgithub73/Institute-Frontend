import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ViewAnnouncement() {
    const [announcement, setAnnouncement] = useState({})
    const { id } = useParams()
    const readURL = `http://localhost:5000/api/v1/announcement/read/${id}`

    // console.log(id)

    const token = useSelector((state) => state.token)

    // console.log("Token", token)

    useEffect(() => {
        fetch(readURL, { method: 'GET', headers: { 'Content-type': 'application/json', 'Authorization': `Bearer ${token}` } })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(!data.success)
                    throw new Error(data.message);
                setAnnouncement(data.data[0]);
            })
            .catch((error) => {
                console.log(error.message)
                toast.error(error.message)
            })
    }, [])

    return (
        <div className="max-w-2xl min-h-96 mx-auto p-4 bg-gray-800 shadow-md">
            <h1 className="text-2xl text-gray-200 font-bold mb-4">{announcement.title}</h1>
            <div className="mb-4 text-gray-100">{announcement.date}</div>
            <div className="mb-4 text-gray-100 text-lg">{announcement.content}</div>
            <div className="text-gray-300 mb-4">
                <span className="font-semibold">Announcer: </span>{announcement.fullName}
            </div>
            <div className="flex space-x-4">
                <button
                    // onClick={handleUpdate}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Update
                </button>
                <button
                    // onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ViewAnnouncement;
// {
//     _id: new ObjectId('668bac67113002d19861194e'),
//     announcer: new ObjectId('66866cffc48cdb0bb9fa352f'),
//     title: 'title',
//     date: '08/07/2024',
//     content: 'this is marks',
//     fullName: 'rajneesh'
// }