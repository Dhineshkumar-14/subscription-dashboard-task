import api from "../../api/axios";

import { setLoading, setAuthData, logout } from "../slices/authSlice";

export const checkAuth = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
      return;
    }

    const response = await api.get("/auth/check-auth");

    dispatch(
      setAuthData({
        user: response.data.user,
        subscription: response.data.subscription,
        plan: response.data.plan,
      }),
    );
  } catch (error) {
    localStorage.removeItem("token");

    dispatch(logout());
  } finally {
    dispatch(setLoading(false));
  }
};
