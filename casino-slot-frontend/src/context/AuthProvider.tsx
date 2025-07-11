import { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
	const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));

	const login = (newToken: string, username: string) => {
		localStorage.setItem("token", newToken);
		localStorage.setItem("username", username);
		setToken(newToken);
		setUsername(username);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		setToken(null);
		setUsername(null);
	};

	return <AuthContext.Provider value={{ token, username, login, logout }}>{children}</AuthContext.Provider>;
};
