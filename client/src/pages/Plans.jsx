import { useSelector } from "react-redux";
import PlansHeader from "../components/plans/PlansHeader";
import { usePlans } from "../hooks/usePlans";
import PlanCard from "../components/plans/PlanCard";
import PlansSkeleton from "../components/plans/PlansSkeleton";

const Plans = () => {
  const { plans, loading, subscribing, handleSubscribe } = usePlans();

  const { user } = useSelector((state) => state.auth);

  if (loading) {
    return <PlansSkeleton />;
  }

  return (
    <>
      <PlansHeader role={user?.role} />

      <div
        className="
    grid
    grid-cols-1
    gap-5

    sm:grid-cols-2

    xl:grid-cols-3
  "
      >
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            role={user?.role}
            subscribing={subscribing}
            onSubscribe={handleSubscribe}
          />
        ))}
      </div>
    </>
  );
};

export default Plans;
