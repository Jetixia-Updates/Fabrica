import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Share2, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Natural");
  const [selectedUnit, setSelectedUnit] = useState<"meter" | "roll">("meter");

  // Mock product data
  const product = {
    id: 1,
    name: "Premium Cotton Linen Blend",
    price_per_meter: 24.99,
    price_per_roll: 299.99, // 12 meters
    roll_length: 12,
    rating: 4.8,
    reviews: 234,
    stock: 156,
    material: "65% Cotton, 35% Linen",
    width: "145cm",
    weight: "250g/m²",
    colors: ["Natural", "White", "Cream", "Light Gray"],
    pattern: "Solid",
    care: "Machine wash cold, tumble dry medium",
    moq: 1,
    lead_time: "1-2 business days",
    images: [
      "https://images.unsplash.com/photo-1598084993000-cd4aaadc8dc0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591601487180-8a72e3a20ad0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585034697428-3fa24e74f4c5?w=600&h=600&fit=crop",
    ],
    description: `Our Premium Cotton Linen Blend is the perfect choice for both professionals and DIY enthusiasts. 
    
This versatile fabric combines the comfort of cotton with the durability of linen, making it ideal for:
- Fashion design and tailoring
- Home décor projects
- Upholstery
- Bedding and linens

Available by the meter or by the roll (12 meters). The fabric features a smooth finish, vibrant colors, and excellent drape. Perfect for a wide variety of projects.`,
    specifications: [
      { label: "Composition", value: "65% Cotton, 35% Linen" },
      { label: "Width", value: "145cm" },
      { label: "Weight", value: "250g/m²" },
      { label: "Pattern", value: "Solid" },
      {
        label: "Care Instructions",
        value: "Machine wash cold, tumble dry medium",
      },
      { label: "Minimum Order Quantity", value: "1 meter" },
      { label: "Lead Time", value: "1-2 business days" },
    ],
  };

  const calculatePrice = () => {
    if (selectedUnit === "meter") {
      return (product.price_per_meter * quantity).toFixed(2);
    } else {
      return (product.price_per_roll * quantity).toFixed(2);
    }
  };

  const getTotalLength = () => {
    if (selectedUnit === "meter") {
      return quantity;
    } else {
      return quantity * product.roll_length;
    }
  };

  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen bg-white">
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
            <div className="flex gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Heart className="w-6 h-6 text-gray-600" />
              </button>
              <Link to="/cart">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
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
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-indigo-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-indigo-600">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    activeImage === idx
                      ? "border-indigo-600"
                      : "border-gray-200"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Title & Rating */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-700">
                {product.rating} ({product.reviews} reviews)
              </span>
              <span className="text-green-600 font-semibold">
                In Stock ({product.stock})
              </span>
            </div>

            {/* Unit Selection */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Choose Unit</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedUnit("meter")}
                  className={`p-4 border-2 rounded-lg transition font-semibold ${
                    selectedUnit === "meter"
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="text-sm text-gray-600">Per Meter</div>
                  <div className="text-xl">${product.price_per_meter}</div>
                </button>
                <button
                  onClick={() => setSelectedUnit("roll")}
                  className={`p-4 border-2 rounded-lg transition font-semibold ${
                    selectedUnit === "roll"
                      ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="text-sm text-gray-600">
                    Per Roll ({product.roll_length}m)
                  </div>
                  <div className="text-xl">${product.price_per_roll}</div>
                  <div className="text-xs text-green-600 font-normal mt-1">
                    Save{" "}
                    {(
                      (1 -
                        product.price_per_roll /
                          (product.price_per_meter * product.roll_length)) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                </button>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 rounded-lg font-medium transition ${
                      selectedColor === color
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Quantity ({selectedUnit === "meter" ? "meters" : "rolls"})
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setQuantity(Math.max(product.moq, quantity - 1))
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  −
                </button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(product.moq, parseInt(e.target.value) || 1),
                    )
                  }
                  className="w-20 text-center text-lg font-semibold"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  +
                </button>
                <span className="text-gray-600 ml-4">
                  = {getTotalLength()} total{" "}
                  {getTotalLength() === 1 ? "meter" : "meters"}
                </span>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-indigo-50 p-6 rounded-lg mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-gray-700">Price per unit:</span>
                <span className="text-2xl font-bold text-indigo-600">
                  $
                  {selectedUnit === "meter"
                    ? product.price_per_meter
                    : product.price_per_roll}
                </span>
              </div>
              <div className="flex items-baseline justify-between mb-4 border-t border-indigo-200 pt-4">
                <span className="text-lg font-semibold text-gray-900">
                  Total:
                </span>
                <span className="text-3xl font-bold text-indigo-600">
                  ${calculatePrice()}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3">
                Add to Cart
              </Button>
              <button className="px-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Heart className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Trust Signals */}
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-indigo-600" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-indigo-600" />
                <span>Quality guaranteed or your money back</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-indigo-600" />
                <span>30-day returns and exchanges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button className="pb-4 border-b-2 border-indigo-600 font-semibold text-indigo-600">
              Description
            </button>
            <button className="pb-4 text-gray-700 hover:text-indigo-600">
              Specifications
            </button>
            <button className="pb-4 text-gray-700 hover:text-indigo-600">
              Reviews
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-sm max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Fabric
              </h2>
              <p className="text-gray-700 whitespace-pre-line mb-6">
                {product.description}
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Care Instructions
              </h3>
              <p className="text-gray-700 mb-6">{product.care}</p>
            </div>
          </div>

          {/* Specifications Sidebar */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Specifications
            </h3>
            <div className="space-y-4">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">
                    {spec.label}
                  </p>
                  <p className="text-gray-900 font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
