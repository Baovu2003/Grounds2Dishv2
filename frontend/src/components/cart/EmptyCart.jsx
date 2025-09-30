import React from "react";
import { Link } from "react-router";
import { ShoppingBag } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Empty Cart */}
        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Giỏ hàng trống
          </h2>
          <p className="text-neutral-600 mb-8">
            Hãy khám phá các sản phẩm bền vững từ bã cà phê của chúng tôi
          </p>
          <Link
            to="/shop"
            className="btn text-white transition-all duration-300 shadow-md hover:shadow-lg"
            style={{ 
              background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)',
              boxShadow: '0 4px 14px 0 rgba(32, 22, 31, 0.2)'
            }}
          >
            Mua sắm ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
