export function handleApiError(err: unknown, fallback = "Something went wrong") {
	if (err instanceof Error && "response" in err) {
		const axiosErr = err as { response?: { data?: { message?: string } } };
		alert(axiosErr.response?.data?.message || fallback);
	} else {
		alert(fallback);
	}
}
