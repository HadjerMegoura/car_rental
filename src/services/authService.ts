import apiClient from "../api/client.api";
import type { User } from "../types/User";

export const authService = {
  //login function
  login({ email, password }: { email: string; password: string }) {
    return apiClient.post("/auth/loginCookies", { email, password });
  },

  //logout function
  logout() {
    return apiClient.post("/auth/logout");
  },

  //get current user function
  getCurrentUser(): Promise<{ data: User | null }> {
    return apiClient.get("/user/me");
  },
};
