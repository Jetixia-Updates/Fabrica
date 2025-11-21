import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-2xl font-bold text-white">
            FabricHub
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 mb-8">
            Sign in to your FabricHub account
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                Demo: admin@fabrichub.com
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                Demo password: password
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-900 mb-4">
              Demo Accounts:
            </p>
            <div className="space-y-3 text-sm">
              <div className="bg-indigo-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">Admin</p>
                <p className="text-gray-600">admin@fabrichub.com</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">Customer</p>
                <p className="text-gray-600">customer@fabrichub.com</p>
              </div>
              <div className="bg-pink-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">Seller</p>
                <p className="text-gray-600">seller@fabrichub.com</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              Password: password
            </p>
          </div>

          {/* Continue Shopping */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Continue without login?{" "}
              <Link
                to="/"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
