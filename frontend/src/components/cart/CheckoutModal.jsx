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
            <h2 className="text-2xl font-bold text-neutral-900">
              Thông tin đặt hàng
            </h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-circle text-neutral-600 hover:text-neutral-900"
            >
              ✕
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text text-neutral-700">Họ và tên *</span>
                </label>
                <input
                  type="text"
                  required
                  value={orderForm.fullName}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, fullName: e.target.value })
                  }
                  className="input input-bordered w-full border-neutral-300 focus:border-neutral-500"
                  placeholder="Nhập họ và tên"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#20161F';
                    e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-neutral-700">Số điện thoại *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={orderForm.phone}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, phone: e.target.value })
                  }
                  className="input input-bordered w-full border-neutral-300 focus:border-neutral-500"
                  placeholder="Nhập số điện thoại"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#20161F';
                    e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text text-neutral-700">Email</span>
              </label>
              <input
                type="email"
                value={orderForm.email}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, email: e.target.value })
                }
                className="input input-bordered w-full border-neutral-300 focus:border-neutral-500"
                placeholder="Nhập email (không bắt buộc)"
                onFocus={(e) => {
                  e.target.style.borderColor = '#20161F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-neutral-700">Địa chỉ *</span>
              </label>
              <input
                type="text"
                required
                value={orderForm.address}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, address: e.target.value })
                }
                className="input input-bordered w-full border-neutral-300 focus:border-neutral-500"
                placeholder="Nhập địa chỉ giao hàng"
                onFocus={(e) => {
                  e.target.style.borderColor = '#20161F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-neutral-700">Thành phố *</span>
              </label>
              <input
                type="text"
                required
                value={orderForm.city}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, city: e.target.value })
                }
                className="input input-bordered w-full border-neutral-300 focus:border-neutral-500"
                placeholder="Nhập thành phố"
                onFocus={(e) => {
                  e.target.style.borderColor = '#20161F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-neutral-700">Ghi chú</span>
              </label>
              <textarea
                value={orderForm.notes}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, notes: e.target.value })
                }
                className="textarea textarea-bordered w-full border-neutral-300 focus:border-neutral-500"
                placeholder="Ghi chú thêm cho đơn hàng (không bắt buộc)"
                rows={3}
                onFocus={(e) => {
                  e.target.style.borderColor = '#20161F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div className="bg-neutral-50 border-2 border-neutral-100 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-2">
                Đơn hàng của bạn:
              </h4>
              <div className="space-y-1 text-sm text-neutral-700">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span style={{ color: '#20161F' }}>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-neutral-200 pt-2 font-bold">
                  <div className="flex justify-between">
                    <span>Tổng cộng:</span>
                    <span style={{ color: '#20161F' }}>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline flex-1 border-neutral-300 text-neutral-600 hover:bg-neutral-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn text-white flex-1 transition-all duration-300 shadow-md hover:shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)',
                  boxShadow: '0 4px 14px 0 rgba(32, 22, 31, 0.2)'
                }}
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
