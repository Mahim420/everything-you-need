import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
