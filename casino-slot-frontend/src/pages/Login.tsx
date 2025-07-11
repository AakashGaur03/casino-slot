import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { handleApiError } from "../utils/handleApiError";
import { useAuth } from "../context/useAuth";

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await API.post("/auth/login", { username, password });
			login(res.data.token, res.data.username);
			navigate("/dashboard");
		} catch (err) {
			handleApiError(err, "Login failed");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="p-6 w-full max-w-md bg-white rounded-xl shadow">
				<h2 className="text-xl font-bold mb-4">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-3">
					<input
						className="border p-2 w-full"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<input
						className="border p-2 w-full"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button className="bg-blue-600 text-white px-4 py-2 w-full" type="submit">
						Login
					</button>
					<p className="text-sm mt-2 text-center">
						Don't have an account?{" "}
						<Link to="/register" className="text-blue-600 hover:underline">
							Register
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
