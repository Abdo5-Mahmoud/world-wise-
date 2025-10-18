import { useAuth } from "../Stores/AuthContext.jsx";
import { FAKE_USER } from "../utils/functions.js";
const user = FAKE_USER;
export default function UserInfo() {
  const { logout } = useAuth();
  return (
    <div className="userInfo">
      <img src={user.avatar} alt="userImg" />
      <span>Welcome, {user.name}</span>
      <button className="link" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
