import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const CartHeader = ({ itemsCount, selectedCount }) => {
  return (
    <div className=" text-base-content rounded-lg p-6 mb-8">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="btn btn-ghost btn-circle text-base-content hover:bg-base-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Giỏ hàng của bạn</h1>
          <p className="text-base-content/70">
            {itemsCount} sản phẩm • {selectedCount} đã chọn
          </p>
        </div>
      </div>
    </div>

  );
};

export default CartHeader;
