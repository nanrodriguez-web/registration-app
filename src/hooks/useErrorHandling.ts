import { ERROR_ENUM } from "@/enums/error-enum";
import type { AUTH_ERROR_T } from "@/types/auth";
import { toast } from "sonner";

export const useErrorHandling = () => {
	const handleError = (
		code?: string,
		message?: string,
		setError?: React.Dispatch<React.SetStateAction<AUTH_ERROR_T | null>>
	) => {
		if (!code) {
			toast.error("Something went wrong");
			return;
		}

		switch (code) {
			case ERROR_ENUM.invalid_request:
				toast.error(message ?? "Invalid request");
				break;

			default:
				console.error("Unknown error code:", code);
				setError?.({ code, message });
		}
	};

	return { handleError };
};
