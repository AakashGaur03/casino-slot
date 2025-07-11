import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { handleApiError } from "../utils/handleApiError";
import { useBackendStatus } from "../context/BackendStatus/useBackendStatus";
import toast from "react-hot-toast";

const Register = () => {
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
			await API.post("/auth/register", {
				username: username.trim(),
				password: password.trim(),
			});
			toast.success("Registration successful! Redirecting...");
			navigate("/login");
		} catch (err) {
			handleApiError(err, "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
				<h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

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
						className="w-full bg-green-600 text-white py-2 rounded disabled:bg-green-300"
						disabled={!isReady || loading}
					>
						{loading ? "Registering..." : "Register"}
					</button>
				</form>

				<p className="text-center text-sm mt-4">
					Already have an account?{" "}
					<Link className="text-blue-500" to="/login">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
