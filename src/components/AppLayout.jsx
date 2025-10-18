import { Outlet } from "react-router-dom";
import Navbar from "./navpar.jsx";

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
