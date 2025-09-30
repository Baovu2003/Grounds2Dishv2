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
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-100">
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
                  className="input input-bordered w-full border-neutral-200 focus:border-neutral-400 bg-white"
                  placeholder="Nhập họ và tên"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#20161F';
                    e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.15)';
                    e.target.style.backgroundColor = '#fefefe';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                    e.target.style.backgroundColor = 'white';
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
                  className="input input-bordered w-full border-neutral-200 focus:border-neutral-400 bg-white"
                  placeholder="Nhập số điện thoại"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#20161F';
                    e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.15)';
                    e.target.style.backgroundColor = '#fefefe';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                    e.target.style.backgroundColor = 'white';
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
                className="input input-bordered w-full border-neutral-200 focus:border-neutral-400 bg-white"
                placeholder="Nhập email (không bắt buộc)"
                onFocus={(e) => {
                  e.target.style.borderColor = '#20161F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.15)';
                  e.target.style.backgroundColor = '#fefefe';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                  e.target.style.backgroundColor = 'white';
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
                className="input input-bordered w-full border-neutral-200 focus:border-neutral-400 bg-white"
                placeholder="Nhập địa chỉ giao hàng"
                onFocus={(e) => {
                  e.target.style.borderColor = '#20161F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.15)';
                  e.target.style.backgroundColor = '#fefefe';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                  e.target.style.backgroundColor = 'white';
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
                className="input input-bordered w-full border-neutral-200 focus:border-neutral-400 bg-white"
                placeholder="Nhập thành phố"
                onFocus={(e) => {
                  e.target.style.borderColor = '#20161F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.15)';
                  e.target.style.backgroundColor = '#fefefe';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                  e.target.style.backgroundColor = 'white';
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
                className="textarea textarea-bordered w-full border-neutral-200 focus:border-neutral-400 bg-white"
                placeholder="Ghi chú thêm cho đơn hàng (không bắt buộc)"
                rows={3}
                onFocus={(e) => {
                  e.target.style.borderColor = '#20161F';
                  e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.15)';
                  e.target.style.backgroundColor = '#fefefe';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                  e.target.style.backgroundColor = 'white';
                }}
              />
            </div>

            <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-neutral-900 mb-4 text-lg">
                Đơn hàng của bạn:
              </h4>
              <div className="space-y-2 text-sm">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-1">
                    <span className="text-neutral-700">{item.name} x{item.quantity}</span>
                    <span className="font-semibold" style={{ color: '#20161F' }}>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-neutral-300 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-neutral-900 text-base">Tổng cộng:</span>
                    <span className="font-bold text-lg" style={{ color: '#20161F' }}>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline flex-1 border-neutral-300 text-neutral-600 hover:bg-neutral-100 hover:border-neutral-400 transition-all duration-300 py-3"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn text-white flex-1 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 py-3"
                style={{ 
                  background: 'linear-gradient(135deg, #20161F 0%, #2d1f2d 100%)',
                  boxShadow: '0 6px 20px 0 rgba(32, 22, 31, 0.3)'
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
