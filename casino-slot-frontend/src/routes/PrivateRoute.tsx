import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/useAuth";

const PrivateRoute = () => {
	const { token } = useAuth();

	return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
