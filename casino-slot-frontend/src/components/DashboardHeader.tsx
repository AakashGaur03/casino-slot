import { useAuth } from "../context/Auth/useAuth";

const DashboardHeader = () => {
	const { username, logout } = useAuth();

	const handleLogout = () => {
		logout("manual");
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
