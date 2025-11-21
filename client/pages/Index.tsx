import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Menu, Heart, Star } from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Featured products for demo
  const featuredProducts = [
    {
      id: 1,
      name: "Premium Cotton Linen Blend",
      image:
        "https://images.unsplash.com/photo-1598084993000-cd4aaadc8dc0?w=400&h=400&fit=crop",
      price: 24.99,
      unit: "per meter",
      rating: 4.8,
      reviews: 234,
      colors: ["Natural", "White", "Cream"],
      sold: 1200,
    },
    {
      id: 2,
      name: "Organic Cotton Canvas",
      image:
        "https://images.unsplash.com/photo-1591601487180-8a72e3a20ad0?w=400&h=400&fit=crop",
      price: 18.5,
      unit: "per meter",
      rating: 4.6,
      reviews: 156,
      colors: ["Khaki", "Navy", "Black"],
      sold: 890,
    },
    {
      id: 3,
      name: "Silk Satin Fabric",
      image:
        "https://images.unsplash.com/photo-1585034697428-3fa24e74f4c5?w=400&h=400&fit=crop",
      price: 42.99,
      unit: "per meter",
      rating: 4.9,
      reviews: 312,
      colors: ["Burgundy", "Gold", "Silver"],
      sold: 2100,
    },
    {
      id: 4,
      name: "Wool Tweed Roll",
      image:
        "https://images.unsplash.com/photo-1583391733981-21a38e7acc29?w=400&h=400&fit=crop",
      price: 89.99,
      unit: "per roll (50m)",
      rating: 4.7,
      reviews: 89,
      colors: ["Brown", "Gray", "Olive"],
      sold: 456,
    },
  ];

  const categories = [
    { name: "Cotton Fabrics", icon: "🧵" },
    { name: "Silk & Satin", icon: "✨" },
    { name: "Wool & Knits", icon: "🎀" },
    { name: "Linen", icon: "🌾" },
    { name: "Synthetic", icon: "🔬" },
    { name: "Specialty", icon: "🎨" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FabricHub
              </div>
            </Link>

            {/* Search Bar - Hide on mobile */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <Input
                  placeholder="Search fabrics, colors, materials..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <Heart className="w-6 h-6 text-gray-600" />
              </button>
              <Link to="/cart">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
                  <ShoppingCart className="w-6 h-6 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Input
                placeholder="Search fabrics..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4">
              <Link
                to="/products"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                All Products
              </Link>
              <Link
                to="/account"
                className="text-gray-700 hover:text-indigo-600 font-medium"
              >
                My Account
              </Link>
            </nav>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 mt-4 border-t border-gray-200 pt-4">
            <Link
              to="/products"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              All Products
            </Link>
            <Link
              to="/account"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              My Account
            </Link>
            <a
              href="#contact"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Premium Fabrics by the Meter & Roll
              </h1>
              <p className="text-lg text-indigo-100 mb-8 leading-relaxed">
                Discover our curated collection of high-quality fabrics. Buy
                exactly what you need—by the meter or by the roll. Perfect for
                DIY enthusiasts, designers, and professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-3">
                    Shop Now
                  </Button>
                </Link>
                <button className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-semibold px-8 py-3 rounded-lg transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1590870969332-35c9e02ebc0f?w=600&h=400&fit=crop"
                alt="Premium fabrics"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
              >
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center cursor-pointer group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition">
                    {category.icon}
                  </div>
                  <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-600">Bestsellers and customer favorites</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition group cursor-pointer">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-gray-200 h-48">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Sale
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Colors */}
                    <div className="flex gap-2 mb-3">
                      {product.colors.slice(0, 3).map((color) => (
                        <div
                          key={color}
                          className="w-4 h-4 rounded-full border-2 border-gray-200"
                          title={color}
                        />
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          ${product.price}
                        </p>
                        <p className="text-xs text-gray-500">{product.unit}</p>
                      </div>
                      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Add
                      </Button>
                    </div>

                    {/* Social Proof */}
                    <p className="text-xs text-gray-500 mt-3">
                      {product.sold}+ sold this month
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                50K+
              </div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                5000+
              </div>
              <p className="text-gray-600">Fabric Varieties</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">24h</div>
              <p className="text-gray-600">Fast Shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get 15% Off Your First Order
          </h2>
          <p className="text-indigo-100 mb-8">
            Subscribe to our newsletter for exclusive deals and new fabric
            releases
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800"
            />
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">About FabricHub</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Shipping Info
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Policies</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 FabricHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
