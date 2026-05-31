import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Plans from "../pages/Plans";
import AdminSubscriptions from "../pages/AdminSubscriptions";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";
import RedirectIfAuth from "./RedirectIfAuth";
import AdminRoute from "./AdminRoute";
import HomeRedirect from "./HomeRedirect";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route
        path="/login"
        element={
          <RedirectIfAuth>
            <Login />
          </RedirectIfAuth>
        }
      />

      <Route
        path="/register"
        element={
          <RedirectIfAuth>
            <Register />
          </RedirectIfAuth>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plans" element={<Plans />} />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
