import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsValid(false);
      return;
    }

    // Validate token in background
    api.get('/admins/me')
      .then(() => setIsValid(true))
      .catch(() => {
        localStorage.clear(); // remove token & profile
        setIsValid(false);
      });
  }, []);

  // Instead of showing Loading..., just render children optimistically
  if (isValid === false) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;