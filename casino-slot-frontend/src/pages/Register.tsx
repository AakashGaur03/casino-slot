import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../utils/handleApiError";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async () => {
		try {
			await API.post("/auth/register", { username, password });
			alert("User created! Please login.");
			navigate("/login");
		} catch (err) {
			handleApiError(err, "Registration failed");
		}
	};

	return (
		<div className="p-4 max-w-md mx-auto space-y-4">
			<h2 className="text-xl font-bold">Register</h2>
			<input className="w-full p-2 border" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
			<input
				className="w-full p-2 border"
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button className="bg-blue-500 text-white px-4 py-2" onClick={handleRegister}>
				Register
			</button>
		</div>
	);
};

export default Register;
