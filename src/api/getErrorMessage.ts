// src/api/getErrorMessage.ts
import axios from "axios";

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Cannot reach the server. Check your connection."; // network error, no response at all
    }
    return error.response.data?.message ?? fallback;
  }
  return fallback;
}
