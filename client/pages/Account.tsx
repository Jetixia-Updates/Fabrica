import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Account() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              FabricHub
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Account</h1>
          <p className="text-gray-600 mb-8 text-lg">
            This page is coming soon. In the meantime, explore our fabrics!
          </p>
          <Link to="/products">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Shop Fabrics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
