import { createContext } from "react";

export type AuthContextType = {
	token: string | null;
	username: string | null;
	login: (token: string, username: string) => void;
	logout: (reason?: "expired" | "manual") => void;
};

export const AuthContext = createContext<AuthContextType>({
	token: null,
	username: null,
	login: () => {},
	logout: () => {},
});
