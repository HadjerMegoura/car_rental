import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import apiClient from "../api/client.api";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";

interface CurrentUser {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
}

export const Home = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get<CurrentUser>("/user/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        showToast("error", "Failed to load your profile.");
      });
  }, [showToast]);

  async function handleLogout() {
    try {
     // await authService.logout();
      showToast("success", "Logged out successfully.");
      navigate("/login");
    } catch {
      showToast("error", "Failed to log out. Please try again.");
    }
  }

  const userName = user ? `${user.firstname} ${user.lastname}` : "";

  return (
    <div className="flex">
      <Sidebar userName={userName} />
      <div className="ml-64 flex-1 min-h-screen bg-[#0B1326]">
        <Header
          userName={userName}
          userEmail={user?.email ?? ""}
          userRole={user?.role ?? ""}
          onLogout={handleLogout}
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Home;