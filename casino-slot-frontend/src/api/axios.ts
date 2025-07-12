import axios from "axios";

const API = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	withCredentials: true,
});

API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

let onLogout: ((reason: "expired") => void) | null = null;

export const setupInterceptors = (logoutFn: (reason: "expired") => void) => {
	onLogout = logoutFn;

	API.interceptors.response.use(
		(res) => res,
		(err) => {
			console.log("BHEER");
			if ((err.response?.status === 401 || err.response?.status === 403) && onLogout) {
				onLogout("expired");
			}
			return Promise.reject(err);
		}
	);
};

export default API;
