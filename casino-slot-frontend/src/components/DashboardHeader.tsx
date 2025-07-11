import { useAuth } from "../context/Auth/useAuth";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
	const { username, logout } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="flex justify-between mb-4">
			<h2 className="text-xl font-bold">Welcome, {username}</h2>
			<button
				className="text-red-500"
				onClick={() => {
					logout();
					navigate("/login");
				}}
			>
				Logout
			</button>
		</div>
	);
};

export default DashboardHeader;
