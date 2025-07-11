import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BackendStatusProvider } from "./context/BackendStatus/BackendStatusProvider.tsx";
import { AuthProvider } from "./context/Auth/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BackendStatusProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BackendStatusProvider>
	</React.StrictMode>
);
