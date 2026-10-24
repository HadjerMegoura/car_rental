import apiClient from "../api/client.api";

export const authService = {
  //login function
  login({ email, password }: { email: string; password: string }) {
    return apiClient.post("/auth/loginCookies", { email, password });
  },
};
