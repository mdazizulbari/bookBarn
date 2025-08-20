import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

// Global flag outside component scope to prevent duplicate toasts
let hasShownToastGlobal = false;

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  if (user) {
    // Reset flag when user logs in successfully (so next redirect can show toast again)
    hasShownToastGlobal = false;
    return children;
  }

  // Only show toast once when redirected from protected route
  if (!hasShownToastGlobal && location.state?.from) {
    toast.error("Please login first");
    hasShownToastGlobal = true;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
