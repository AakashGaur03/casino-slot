import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { handleApiError } from "../utils/handleApiError";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const res = await API.post("/auth/login", { username, password });
			login(res.data.token, username);
			navigate("/dashboard");
		} catch (err) {
			handleApiError(err, "Login failed");
		}
	};

	return (
		<div className="p-4 max-w-md mx-auto space-y-4">
			<h2 className="text-xl font-bold">Login</h2>
			<input className="w-full p-2 border" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
			<input
				className="w-full p-2 border"
				type="password"
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button className="bg-green-500 text-white px-4 py-2" onClick={handleLogin}>
				Login
			</button>
		</div>
	);
};

export default Login;
