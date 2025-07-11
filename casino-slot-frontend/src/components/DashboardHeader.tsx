import { useAuth } from "../context/Auth/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const DashboardHeader = () => {
	const { username, logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout();
		toast.success("Logged out successfully");
		navigate("/login");
	};

	return (
		<div className="flex justify-between mb-4">
			<h2 className="text-xl font-bold">Welcome, {username}</h2>
			<button className="text-red-500" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};

export default DashboardHeader;
