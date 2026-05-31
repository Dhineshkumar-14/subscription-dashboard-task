import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomeRedirect = () => {
  const { isAuthenticated, user, subscription, loading } = useSelector(
    (state) => state.auth,
  );
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin/subscriptions" replace />;
  }

  if (subscription?.status === "active") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/plans" replace />;
};

export default HomeRedirect;
