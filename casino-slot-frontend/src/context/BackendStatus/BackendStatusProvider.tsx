import { useEffect, useState } from "react";
import { BackendStatusContext } from "./BackendStatusContext";
import API from "../../api/axios";

export const BackendStatusProvider = ({ children }: { children: React.ReactNode }) => {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		API.get("/ping")
			.then(() => setIsReady(true))
			.catch(() => setIsReady(false));
	}, []);

	return <BackendStatusContext.Provider value={{ isReady }}>{children}</BackendStatusContext.Provider>;
};
