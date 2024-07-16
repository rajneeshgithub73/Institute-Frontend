import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function ViewAnnouncement() {
    const [announcement, setAnnouncement] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { id } = useParams();
    const readURL = `http://localhost:5000/api/v1/announcement/read/${id}`;

    const token = useSelector((state) => state.token);

    const navigate = useNavigate();

    const [isUpdate, setIsUpdate] = useState(true);

    useEffect(() => {
        fetch(readURL, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.success) throw new Error(data.message);
                setAnnouncement(data.data[0]);
                setTitle(data.data[0].title);
                setContent(data.data[0].content);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }, []);

    const handleUpdate = async () => {
        if (isUpdate) {
            setIsUpdate(false);
        } else {
            try {
                const date = new Date()
                const updatedAnnouncement = {
                    title: title,
                    content: content,
                    date: date.toLocaleDateString()
                }
                const response = await fetch(`http://localhost:5000/api/v1/announcement/update/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(updatedAnnouncement)
                })

                const data = await response.json();

                if (!data.success) throw new Error(data.message);

                toast.success(data.message);
                navigate('/announcement')
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/announcement/delete/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            })

            const data = await response.json();

            if (!data.success) throw new Error("Delete Failed");

            toast.success(data.message);
            navigate('/announcement');
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="max-w-2xl min-h-96 mx-auto p-4 bg-gray-800 shadow-md">
            {/* <h1 className="text-2xl text-gray-200 font-bold mb-4">
        {announcement.title}
      </h1> */}
            <div className="mb-2">
                <label htmlFor="title" className="block text-white text-sm font-bold mb-2">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-white disabled:text-gray-900"
                    disabled={isUpdate}
                />
            </div>
            <div className="mb-4 text-gray-100">{announcement.date}</div>
            {/* <div className="mb-4 text-gray-100 text-lg">{announcement.content}</div> */}
            <div className="mb-4">
                <label htmlFor="content" className="block text-white text-sm font-bold mb-2">Content:</label>
                <textarea
                    type="text"
                    rows="10"
                    cols="50"
                    name="content"
                    id="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-white disabled:text-gray-900"
                    disabled={isUpdate}
                />
            </div>
            <div className="text-gray-300 mb-4">
                <span className="font-semibold">Announcer: </span>
                {announcement.fullName}
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Update
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ViewAnnouncement;
