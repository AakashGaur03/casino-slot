import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/Auth/useAuth";
import { handleApiError } from "../utils/handleApiError";
import { useBackendStatus } from "../context/BackendStatus/useBackendStatus";

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const { isReady } = useBackendStatus();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isReady) return;

		try {
			const res = await API.post("/auth/login", { username, password });
			login(res.data.token, res.data.username);
			navigate("/dashboard");
		} catch (err) {
			handleApiError(err, "Login failed");
		}
	};

	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
				<h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

				{!isReady && (
					<p className="text-center text-yellow-600 text-sm mb-3 animate-pulse">Waking up backend... Please wait.</p>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full border p-2 rounded"
						disabled={!isReady}
					/>

					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full border p-2 rounded"
						disabled={!isReady}
					/>

					<button
						type="submit"
						className="w-full bg-purple-600 text-white py-2 rounded disabled:bg-purple-300"
						disabled={!isReady}
					>
						Login
					</button>
				</form>

				<p className="text-center text-sm mt-4">
					Don't have an account?{" "}
					<Link className="text-blue-500" to="/register">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
