import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddAnnouncement() {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const token = useSelector(state => state.token)

    const navigate = useNavigate()

    const addAnnouncement = async (e) => {
        e.preventDefault()
        const date = new Date()
        console.table([title, content, date])
        const announcement = {
            title: title,
            content: content,
            date: date.toLocaleDateString()
        }
        await fetch('http://localhost:5000/api/v1/announcement/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(announcement)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
            navigate('/announcement')
    }

    return (
        <div className="max-w-4xl mx-auto p-3 bg-gray-900 shadow-md">
            <form onSubmit={addAnnouncement}>
                <div className="mb-2">
                    <label htmlFor="title" className="block text-white text-sm font-bold mb-2">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
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
                        className="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add
                </button>
            </form>
        </div>
    );
}

export default AddAnnouncement;