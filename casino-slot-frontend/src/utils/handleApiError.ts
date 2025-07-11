import toast from "react-hot-toast";

export function handleApiError(err: unknown, fallback = "Something went wrong") {
	if (err instanceof Error && "response" in err) {
		const axiosErr = err as { response?: { data?: { message?: string } } };
		toast.error(axiosErr.response?.data?.message || fallback);
	} else {
		toast.error(fallback);
	}
}
