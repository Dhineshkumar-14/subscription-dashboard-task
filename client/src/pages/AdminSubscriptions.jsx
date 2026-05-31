import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      const res = await api.get("/admin/subscriptions");

      setSubscriptions(res.data.subscriptions);
      setFilteredSubscriptions(res.data.subscriptions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    const filtered = subscriptions.filter(
      (sub) =>
        sub.user_name?.toLowerCase().includes(search.toLowerCase()) ||
        sub.email?.toLowerCase().includes(search.toLowerCase()) ||
        sub.plan_name?.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredSubscriptions(filtered);
  }, [search, subscriptions]);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";

      case "expired":
        return "bg-red-100 text-red-700";

      case "cancelled":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg text-slate-500">Loading subscriptions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Subscriptions
            </h1>

            <p className="mt-1 text-slate-500">Manage all user subscriptions</p>
          </div>

          <div className="rounded-xl bg-white dark:bg-slate-800 px-5 py-3 shadow">
            <span className="text-sm text-slate-500">Total Subscriptions</span>

            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {filteredSubscriptions.length}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by user, email or plan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Plan</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Duration</th>
                  <th className="p-4 text-left">Start Date</th>
                  <th className="p-4 text-left">End Date</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubscriptions.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-slate-500">
                      No subscriptions found
                    </td>
                  </tr>
                ) : (
                  filteredSubscriptions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/40"
                    >
                      <td className="p-4 font-medium">{sub.user_name}</td>

                      <td className="p-4">{sub.email}</td>

                      <td className="p-4">{sub.plan_name}</td>

                      <td className="p-4">₹{sub.price}</td>

                      <td className="p-4">{sub.duration} Days</td>

                      <td className="p-4">
                        {new Date(sub.start_date).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        {new Date(sub.end_date).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                            sub.status,
                          )}`}
                        >
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscriptions;
