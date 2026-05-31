import api from "../api/axios";

export const getPlans = async () => {
  const response = await api.get("/plans");

  return response.data.data;
};

export const subscribeToPlan = async (planId) => {
  const response = await api.post(`/subscriptions/subscribe/${planId}`);

  return response.data;
};
