import { useEffect, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import api from "../api/axios";
import { errorToast, successToast } from "../utils/toast";
import { checkAuth } from "../store/actions/authActions";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get("/plans");

        setPlans(response.data.data);
      } catch (error) {
        console.error(error);

        errorToast("Failed to load plans");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId) => {
    try {
      setSubscribing(planId);

      await api.post(`/subscriptions/subscribe/${planId}`);

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

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-slate-500">Loading plans...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-16 text-center">
        {user.role === "user" && (
          <>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
              Choose Your Plan
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
              Flexible pricing for individuals, startups, and growing
              businesses.
            </p>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
              Subscription Plans
            </h1>

            <div className="mt-6 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
              Read-Only View • Administrators can view plans but cannot
              subscribe
            </div>
          </>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => {
          const isPro = plan.name.toLowerCase() === "pro";

          return (
            <div
              key={plan.id}
              className={`relative flex min-h-[560px] flex-col rounded-3xl bg-white dark:bg-slate-800 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
        ${
          isPro
            ? "border-2 border-blue-600 shadow-xl"
            : "border border-slate-200 dark:border-slate-700 shadow-sm"
        }`}
            >
              {isPro && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                    <Sparkles size={16} />
                    Recommended Plan
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {plan.name}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Premium features with flexible access and subscription
                  benefits.
                </p>
              </div>

              <div className="mt-8">
                <span className="text-5xl font-bold text-slate-900 dark:text-white">
                  ₹{plan.price}
                </span>

                <span className="ml-2 text-slate-500">/month</span>
              </div>

              <div className="mt-3 text-sm text-slate-500">
                Valid for {plan.duration} days
              </div>

              <div className="mt-10 flex-1">
                <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
                  Plan Benefits
                </h3>

                <ul className="space-y-4">
                  {plan.features?.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check size={18} className="shrink-0 text-green-500" />

                      <span className="text-slate-600 dark:text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {user?.role === "admin" ? (
                <button
                  disabled
                  className="mt-10 w-full cursor-not-allowed rounded-xl bg-slate-300 py-3 font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                >
                  Admin View Only
                </button>
              ) : (
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={subscribing === plan.id}
                  className={`mt-10 w-full rounded-xl py-3 font-semibold transition
            ${
              isPro
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            }
            ${subscribing === plan.id ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  {subscribing === plan.id ? "Activating..." : "Activate Plan"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Plans;
