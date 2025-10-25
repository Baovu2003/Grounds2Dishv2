import React from "react";
import { Link } from "react-router";

const OrderSummary = ({
  totalPrice,
  totalSelectedItems,
  cupDiscount = 0,
  finalPrice,
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
      <div className="card bg-white border-2 border-neutral-100 shadow-sm sticky top-4">
        <div className="card-body p-6">
          <h3 className="text-xl font-bold text-neutral-900 mb-4">
            Tóm tắt đơn hàng
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-neutral-700">
              <span>Tạm tính:</span>
              <span style={{ color: '#20161F' }}>{formatPrice(totalPrice)}</span>
            </div>
            
            {cupDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span className="flex items-center gap-1">
                  <span>🎉</span> Giảm giá cốc (2 cốc -10%):
                </span>
                <span className="font-semibold">-{formatPrice(cupDiscount)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-neutral-700">
              <span>Phí vận chuyển:</span>
              <span style={{ color: '#20161F' }}>Miễn phí</span>
            </div>
            
            <div className="border-t border-neutral-200 pt-3">
              <div className="flex justify-between text-xl font-bold text-neutral-900">
                <span>Tổng cộng:</span>
                <span style={{ color: '#20161F' }}>{formatPrice(finalPrice || totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-neutral-600 mb-6">
            {totalSelectedItems} sản phẩm đã chọn
          </div>

          <button
            onClick={onCheckout}
            disabled={totalSelectedItems === 0}
            className="btn text-white w-full disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-300 shadow-md hover:shadow-lg"
            style={totalSelectedItems > 0 ? { 
              background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)',
              boxShadow: '0 4px 14px 0 rgba(32, 22, 31, 0.2)'
            } : {}}
          >
            Đặt hàng ({totalSelectedItems})
          </button>

          <Link
            to="/shop"
            className="btn btn-outline w-full mt-3 border-neutral-300 text-neutral-600 hover:bg-neutral-50"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>

  );
};

export default OrderSummary;
