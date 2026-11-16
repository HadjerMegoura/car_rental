import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { authService } from "../services/authService";

const ProtectedRoutes = () => {
  const [authStatus, setAuthStatus] = useState<
    "checking" | "authenticated" | "unauthenticated"
  >("checking");

  useEffect(() => {
    let active = true;

    authService
      .getCurrentUser()
      .then((response) => {
        if (active) {
          setAuthStatus(response.data ? "authenticated" : "unauthenticated");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        if (active) {
          setAuthStatus("unauthenticated");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (authStatus === "checking") {
    return <Loading label="Checking your session..." fullPage />;
  }

  return authStatus === "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoutes;
