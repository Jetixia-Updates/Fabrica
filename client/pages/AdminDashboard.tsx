import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut, BarChart3, Package, Users, Settings } from "lucide-react";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const stats = [
    {
      label: "Total Products",
      value: "156",
      icon: Package,
      color: "bg-indigo-600",
    },
    {
      label: "Total Orders",
      value: "1,234",
      icon: BarChart3,
      color: "bg-purple-600",
    },
    { label: "Total Users", value: "892", icon: Users, color: "bg-pink-600" },
    {
      label: "Revenue",
      value: "$45,678",
      icon: Settings,
      color: "bg-blue-600",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      amount: "$124.99",
      status: "Shipped",
    },
    { id: "ORD-002", customer: "Jane Smith", amount: "$89.50", status: "Paid" },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      amount: "$234.00",
      status: "Pending",
    },
    {
      id: "ORD-004",
      customer: "Sarah Wilson",
      amount: "$156.75",
      status: "Delivered",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                FabricHub Admin
              </h1>
              <p className="text-sm text-gray-600">
                Welcome, {user.firstName}!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.email}
                </p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <Link
              to="/admin/dashboard"
              className="block px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium"
            >
              📊 Dashboard
            </Link>
            <Link
              to="/admin/products"
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
            >
              📦 Products
            </Link>
            <Link
              to="/admin/orders"
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
            >
              📋 Orders
            </Link>
            <Link
              to="/admin/users"
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
            >
              👥 Users
            </Link>
            <Link
              to="/admin/settings"
              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
            >
              ⚙️ Settings
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-600"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Paid"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                  Add New Product
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 font-medium">
                  View All Orders
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                System Info
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <strong>Version:</strong> 1.0.0
                </p>
                <p>
                  <strong>Database:</strong> PostgreSQL
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600">● Online</span>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
