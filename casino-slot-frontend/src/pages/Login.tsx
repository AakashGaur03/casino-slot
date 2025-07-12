import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/Auth/useAuth";
import { handleApiError } from "../utils/handleApiError";
import { useBackendStatus } from "../context/BackendStatus/useBackendStatus";
import toast from "react-hot-toast";

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const { isReady } = useBackendStatus();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isReady || loading) return;

		if (username.trim().length < 3 || password.trim().length < 6) {
			return toast.error("Username must be at least 3 characters and password at least 6 characters.");
		}

		try {
			setLoading(true);
			const res = await API.post("/auth/login", {
				username: username.trim(),
				password: password.trim(),
			});
			login(res.data.token, res.data.username);
			toast.success("Login successful!");
			navigate("/dashboard");
		} catch (err) {
			handleApiError(err, "Login failed");
		} finally {
			setLoading(false);
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
						disabled={!isReady || loading}
					/>

					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full border p-2 rounded"
						disabled={!isReady || loading}
					/>

					<button
						type="submit"
						className="w-full bg-purple-600 text-white py-2 rounded disabled:bg-purple-300"
						disabled={!isReady || loading}
					>
						{loading ? "Logging in..." : "Login"}
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
