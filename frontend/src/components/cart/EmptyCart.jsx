import React from "react";
import { Link } from "react-router";
import { ShoppingBag } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Empty Cart */}
        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-green-900 mb-4">
            Giỏ hàng trống
          </h2>
          <p className="text-amber-700 mb-8">
            Hãy khám phá các sản phẩm bền vững từ bã cà phê của chúng tôi
          </p>
          <Link
            to="/shop"
            className="btn bg-green-600 hover:bg-green-700 text-white"
          >
            Mua sắm ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
