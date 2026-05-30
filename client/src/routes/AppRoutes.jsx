import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";

import RedirectIfAuth from "./RedirectIfAuth";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <Routes>
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

      {/* <Route
        element={<ProtectedRoute />}
      >
        <Route
          element={<MainLayout />}
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/plans"
            element={<Plans />}
          />
        </Route>
      </Route> */}

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
