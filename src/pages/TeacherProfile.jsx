import { useSelector } from "react-redux";
import Profile from "../components/Profile"

function TeacherProfile() {
    const userDetails = useSelector(state => state.user)
    return ( 
        <div>
            <Profile userDetails={userDetails} />
        </div>
     );
}

export default TeacherProfile;