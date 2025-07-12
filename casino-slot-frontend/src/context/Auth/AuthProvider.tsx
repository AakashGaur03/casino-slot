import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { setupInterceptors } from "../../api/axios";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
	const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
	const navigate = useNavigate();

	const login = (newToken: string, username: string) => {
		localStorage.setItem("token", newToken);
		localStorage.setItem("username", username);
		setToken(newToken);
		setUsername(username);
	};

	const logout = (reason: "expired" | "manual" = "manual") => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		setToken(null);
		setUsername(null);
		console.log("first");
		if (reason === "expired") {
			// toast.error("Session expired. Please login again.");
		} else {
			toast.success("Logged out successfully");
		}

		navigate("/login");
	};

	useEffect(() => {
		console.log("Axios interceptors");
		setupInterceptors(logout);
	}, []);

	return <AuthContext.Provider value={{ token, username, login, logout }}>{children}</AuthContext.Provider>;
};
