import React from "react";

const CheckoutModal = ({ 
  isOpen, 
  onClose, 
  orderForm, 
  setOrderForm, 
  selectedItems, 
  totalPrice, 
  onSubmit 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-amber-900">
              Thông tin đặt hàng
            </h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-circle"
            >
              ✕
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text text-amber-900">Họ và tên *</span>
                </label>
                <input
                  type="text"
                  required
                  value={orderForm.fullName}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, fullName: e.target.value })
                  }
                  className="input input-bordered w-full border-green-300 focus:border-green-500"
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-amber-900">Số điện thoại *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={orderForm.phone}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, phone: e.target.value })
                  }
                  className="input input-bordered w-full border-green-300 focus:border-green-500"
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text text-amber-900">Email</span>
              </label>
              <input
                type="email"
                value={orderForm.email}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, email: e.target.value })
                }
                className="input input-bordered w-full border-green-300 focus:border-green-500"
                placeholder="Nhập email (không bắt buộc)"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-amber-900">Địa chỉ *</span>
              </label>
              <input
                type="text"
                required
                value={orderForm.address}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, address: e.target.value })
                }
                className="input input-bordered w-full border-green-300 focus:border-green-500"
                placeholder="Nhập địa chỉ giao hàng"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-amber-900">Thành phố *</span>
              </label>
              <input
                type="text"
                required
                value={orderForm.city}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, city: e.target.value })
                }
                className="input input-bordered w-full border-green-300 focus:border-green-500"
                placeholder="Nhập thành phố"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-amber-900">Ghi chú</span>
              </label>
              <textarea
                value={orderForm.notes}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, notes: e.target.value })
                }
                className="textarea textarea-bordered w-full border-green-300 focus:border-green-500"
                placeholder="Ghi chú thêm cho đơn hàng (không bắt buộc)"
                rows={3}
              />
            </div>

            <div className="bg-green-50 border-2 border-green-100 rounded-lg p-4">
              <h4 className="font-semibold text-amber-900 mb-2">
                Đơn hàng của bạn:
              </h4>
              <div className="space-y-1 text-sm text-amber-700">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-green-200 pt-2 font-bold">
                  <div className="flex justify-between">
                    <span>Tổng cộng:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline flex-1 border-green-300 text-green-600 hover:bg-green-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn bg-green-600 hover:bg-green-700 text-white flex-1"
              >
                Xác nhận đặt hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
