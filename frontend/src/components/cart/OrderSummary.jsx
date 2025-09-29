import React from "react";
import { Link } from "react-router";

const OrderSummary = ({
  totalPrice,
  totalSelectedItems,
  onCheckout
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="lg:col-span-1">
      <div className="card bg-white border-2 border-green-100 shadow-sm sticky top-4">
        <div className="card-body p-6">
          <h3 className="text-xl font-bold text-black-800 mb-4">
            Tóm tắt đơn hàng
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-green-700">
              <span>Tạm tính:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-green-700">
              <span>Phí vận chuyển:</span>
              <span>Miễn phí</span>
            </div>
            <div className="border-t border-green-200 pt-3">
              <div className="flex justify-between text-xl font-bold text-black-800">
                <span>Tổng cộng:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-green-600 mb-6">
            {totalSelectedItems} sản phẩm đã chọn
          </div>

          <button
            onClick={onCheckout}
            disabled={totalSelectedItems === 0}
            className="btn bg-green-600 hover:bg-green-700 text-white w-full disabled:bg-gray-300 disabled:text-gray-500"
          >
            Đặt hàng ({totalSelectedItems})
          </button>

          <Link
            to="/shop"
            className="btn btn-outline w-full mt-3 border-green-300 text-green-600 hover:bg-green-50"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>

  );
};

export default OrderSummary;
