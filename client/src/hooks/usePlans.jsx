import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { checkAuth } from "../store/actions/authActions";
import { errorToast, successToast } from "../utils/toast";

import { getPlans, subscribeToPlan } from "../services/planService";

export const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);

      const data = await getPlans();

      setPlans(data);
    } catch (error) {
      console.error(error);

      errorToast("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId) => {
    try {
      setSubscribing(planId);

      await subscribeToPlan(planId);

      successToast("Subscription successful!");

      await dispatch(checkAuth());

      navigate("/");
    } catch (error) {
      console.error(error);

      errorToast(error?.response?.data?.message || "Failed to subscribe");
    } finally {
      setSubscribing(null);
    }
  };

  return {
    plans,
    loading,
    subscribing,
    handleSubscribe,
  };
};
