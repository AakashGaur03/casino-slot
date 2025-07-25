import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/Auth/AuthProvider";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Toaster position="top-center" toastOptions={{ duration: 3000 }} />
				<Routes>
					<Route path="/" element={<Register />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route element={<PrivateRoute />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
					<Route path="*" element={<Navigate to="/login" />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
