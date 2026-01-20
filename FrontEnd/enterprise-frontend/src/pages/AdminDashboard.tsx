import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
}

export const AdminDashboard = () => {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect non-admin users
  useEffect(() => {
    if (role && role !== "Admin") {
      navigate("/");
    }
  }, [role, navigate]);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get<DashboardStats>("/api/admin/dashboard");
      setStats(res.data);
    } catch {
      setError("Access denied or server error while loading dashboard.");
    } finally {
      setLoading(false);
    }
  };

  // Auto-load when page opens
  useEffect(() => {
    if (role === "Admin") {
      load();
    }
  }, [role]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>

      <div className="flex gap-3 mb-6">
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={load}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh Data"}
        </button>

        <Link
          to="/admin/add-product"
          className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
        >
          + Add Product
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded shadow">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </div>

          <div className="bg-green-100 p-4 rounded shadow">
            <p className="text-sm text-gray-600">Total Products</p>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
          </div>

          <div className="bg-purple-100 p-4 rounded shadow">
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </div>
        </div>
      )}

      {!loading && !stats && !error && (
        <p className="text-gray-500">No dashboard data loaded.</p>
      )}
    </div>
  );
};
