import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,

  user: null,
  subscription: null,
  plan: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAuthData: (state, action) => {
      state.isAuthenticated = true;

      state.user = action.payload.user;
      state.subscription = action.payload.subscription;
      state.plan = action.payload.plan;
    },

    logout: (state) => {
      state.loading = false;
      state.isAuthenticated = false;

      state.user = null;
      state.subscription = null;
      state.plan = null;
    },
  },
});

export const {
  setLoading,
  setAuthData,
  logout,
} = authSlice.actions;

export default authSlice.reducer;