import {
  Route,
  BrowserRouter as Router,
  useNavigate,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginIni from "./Components/Login/LoginIni";
import HomeIni from "./Components/Home/HomeIni";
import { useEffect, useState } from "react";
import MyTasksIni from "./Components/Home/MyTasks/MyTasksIni";

export default function Rutas() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setId(user.id);
    localStorage.setItem("selectedUserId", user.id); // Store the selected user ID in localStorage
    navigate(`/home?userId=${user.id}`);
  };
  useEffect(() => {
    if (!selectedUser && location.pathname !== "/") {
      navigate("/");
    }
  }, [selectedUser, navigate, location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={<LoginIni handleUserClick={handleUserClick} />}
      />
      <Route
        path="/home"
        element={<HomeIni selectedUser={selectedUser} id={id} />}
      />
      <Route
        path="/mytasks"
        element={<MyTasksIni selectedUser={selectedUser} id={id} />}
      />
    </Routes>
  );
}
