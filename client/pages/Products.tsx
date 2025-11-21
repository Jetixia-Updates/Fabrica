import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, Star, Sliders } from "lucide-react";
import { useState } from "react";

export default function Products() {
  const [searchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const category = searchParams.get("category");

  const products = [
    {
      id: 1,
      name: "Premium Cotton Linen Blend",
      image:
        "https://images.unsplash.com/photo-1598084993000-cd4aaadc8dc0?w=400&h=400&fit=crop",
      price: 24.99,
      unit: "per meter",
      rating: 4.8,
      reviews: 234,
      category: "Cotton Fabrics",
      colors: ["Natural", "White", "Cream"],
      width: "145cm",
      material: "Cotton/Linen Blend",
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
      category: "Cotton Fabrics",
      colors: ["Khaki", "Navy", "Black"],
      width: "150cm",
      material: "100% Cotton",
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
      category: "Silk & Satin",
      colors: ["Burgundy", "Gold", "Silver"],
      width: "140cm",
      material: "100% Silk",
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
      category: "Wool & Knits",
      colors: ["Brown", "Gray", "Olive"],
      width: "160cm",
      material: "100% Wool",
      sold: 456,
    },
    {
      id: 5,
      name: "Natural Linen Fabric",
      image:
        "https://images.unsplash.com/photo-1544367567-0d0a57b8f6d9?w=400&h=400&fit=crop",
      price: 19.99,
      unit: "per meter",
      rating: 4.5,
      reviews: 178,
      category: "Linen",
      colors: ["Natural", "White", "Flax"],
      width: "148cm",
      material: "100% Linen",
      sold: 650,
    },
    {
      id: 6,
      name: "Polyester Jersey Knit",
      image:
        "https://images.unsplash.com/photo-1590870969332-35c9e02ebc0f?w=400&h=400&fit=crop",
      price: 12.99,
      unit: "per meter",
      rating: 4.3,
      reviews: 120,
      category: "Synthetic",
      colors: ["Black", "Navy", "White"],
      width: "160cm",
      material: "100% Polyester",
      sold: 1450,
    },
  ];

  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  const categories = [
    "Cotton Fabrics",
    "Silk & Satin",
    "Wool & Knits",
    "Linen",
    "Synthetic",
  ];
  const widths = ["140cm", "145cm", "148cm", "150cm", "160cm"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex-shrink-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FabricHub
              </div>
            </Link>

            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <Input
                  placeholder="Search fabrics..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition hidden md:flex">
                <Heart className="w-6 h-6 text-gray-600" />
              </button>
              <Link to="/cart">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10 0h2m-2 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-indigo-600">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {category || "All Products"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between lg:block mb-6">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 text-indigo-600"
              >
                <Sliders className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div
              className={`${mobileFilterOpen ? "block" : "hidden"} lg:block`}
            >
              {/* Category Filter */}
              <div className="mb-8 bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-gray-900 mb-4">Category</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300"
                      defaultChecked={!category}
                    />
                    <span className="ml-2 text-gray-700">All Categories</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 rounded border-gray-300"
                        defaultChecked={category === cat}
                      />
                      <span className="ml-2 text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Width Filter */}
              <div className="mb-8 bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-gray-900 mb-4">Fabric Width</h3>
                <div className="space-y-3">
                  {widths.map((width) => (
                    <label key={width} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 rounded border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">{width}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-3">
                  {["Under $20", "$20 - $50", "$50 - $100", "Over $100"].map(
                    (range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 rounded border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">{range}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {category || "All Fabrics"}
                </h1>
                <p className="text-gray-600 mt-1">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              {/* Sort */}
              <div className="hidden sm:block">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Best Sellers</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition group cursor-pointer">
                    <div className="relative overflow-hidden bg-gray-200 h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-indigo-600 font-semibold mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-600">
                        {product.name}
                      </h3>

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
                        <span className="text-xs text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="text-xs text-gray-600 mb-3 space-y-1">
                        <p>Width: {product.width}</p>
                        <p>Material: {product.material}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xl font-bold text-gray-900">
                            ${product.price}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.unit}
                          </p>
                        </div>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
