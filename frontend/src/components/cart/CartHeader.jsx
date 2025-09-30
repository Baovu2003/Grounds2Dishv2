import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const CartHeader = ({ itemsCount, selectedCount }) => {
  return (
    <div className="text-neutral-900 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="btn btn-ghost btn-circle text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Giỏ hàng của bạn</h1>
          <p className="text-neutral-600">
            {itemsCount} sản phẩm • {selectedCount} đã chọn
          </p>
        </div>
      </div>
    </div>

  );
};

export default CartHeader;
