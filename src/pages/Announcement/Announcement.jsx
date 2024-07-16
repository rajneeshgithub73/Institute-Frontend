import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddAnnouncement from "../../components/AddAnnouncement";
import { useSelector } from "react-redux";

function Announcement() {
  const teacherStatus = useSelector((state) => state.isTeacher);
  const token = useSelector((state) => state.token);

  const [announcementList, setAnnouncementList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/announcement/get-list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAnnouncementList(data.data);
      })
      .catch((error) => error.message);
  }, []);

  return (
    <div>
      {teacherStatus && <AddAnnouncement />}
      <div className="max-w-4xl mx-auto p-4 bg-gray-800 shadow-md">
        <h1 className="text-2xl text-gray-100 font-bold mb-6 text-center underline">
          Announcements
        </h1>
        <ul className="space-y-4">
          {announcementList.map((announcement) => (
            <li
              key={announcement._id}
              className="border-b border-gray-200 pb-2"
            >
              <div className="text-gray-100">{announcement.date}</div>
              <Link
                to={`/announcement/${announcement._id}`}
                className="text-gray-100 hover:underline"
              >
                <div className="text-lg font-semibold">
                  {announcement.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Announcement;
