import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Toaster } from "sonner";

import AppRoutes from "./routes/AppRoutes";
import { checkAuth } from "./store/actions/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
