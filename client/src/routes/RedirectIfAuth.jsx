import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RedirectIfAuth = ({ children }) => {
  const { loading, isAuthenticated, user, subscription } = useSelector(
    (state) => state.auth,
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/subscriptions" replace />;
    }

    if (subscription?.status === "active") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/plans" replace />;
  }

  return children;
};

export default RedirectIfAuth;
