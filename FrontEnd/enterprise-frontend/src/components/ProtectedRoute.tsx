import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: "Please login to continue", from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};
