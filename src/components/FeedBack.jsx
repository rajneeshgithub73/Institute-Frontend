import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FeedBack() {

    const [content, setContent] = useState("")

    const token = useSelector(state => state.token)
    const navigate = useNavigate();

    const addFeedback = async (e) => {
        e.preventDefault()
        try {    
            const feedback = {
                content: content,
            }

            const response = await fetch('http://localhost:5000/api/v1/feedback/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(feedback)
            })
    
            const data = await response.json();
    
            if (!data.success) {
                throw new Error(data.message)
            }
            toast.success(data.message);
            navigate('/');
    
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-3 bg-gray-900 shadow-md">
            <h2 className="text-2xl text-gray-100 font-semibold mb-2 text-center">
                Feed Back
            </h2>
            <form onSubmit={addFeedback}>
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
                    Submit
                </button>
            </form>
        </div>
    );
}

export default FeedBack;