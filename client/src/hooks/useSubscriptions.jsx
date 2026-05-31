import { useEffect, useState } from "react";
import api from "../api/axios";

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [total, setTotal] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [plan, setPlan] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, plan]);

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans");

      setPlans(res?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch plans", error);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/subscriptions", {
        params: {
          page,
          limit: 10,
          search: debouncedSearch,
          plan,
        },
      });

      setSubscriptions(res?.data?.subscriptions || []);

      setTotalPages(res?.data?.pagination?.totalPages || 1);
      setTotal(res?.data?.pagination?.total);
      setStats(res?.data?.stats);
    } catch (error) {
      console.error("Failed to fetch subscriptions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [page, debouncedSearch, plan]);

  return {
    subscriptions,
    plans,
    total,
    stats,

    loading,

    page,
    totalPages,

    search,
    plan,

    setPage,
    setSearch,
    setPlan,

    refetchSubscriptions: fetchSubscriptions,
  };
};
