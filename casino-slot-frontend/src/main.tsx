import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BackendStatusProvider } from "./context/BackendStatus/BackendStatusProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BackendStatusProvider>
			<App />
		</BackendStatusProvider>
	</React.StrictMode>
);
