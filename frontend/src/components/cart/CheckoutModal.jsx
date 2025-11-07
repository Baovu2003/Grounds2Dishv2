import React, { useState, useEffect } from "react";
import { apiClient } from "../../constants/apiUrl";
import { getProvincesFromBackup, getDistrictsFromBackup, getWardsFromBackup } from "../../data/vietnam-address-data";

const CheckoutModal = ({
  isOpen,
  onClose,
  orderForm,
  setOrderForm,
  selectedItems,
  totalPrice,
  cupDiscount = 0,
  finalPrice,
  clearSelected,
  setSuccessMessage,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [loading, setLoading] = useState(false);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  useEffect(() => {
    if (isOpen) {
      // Lấy dữ liệu tỉnh/thành phố từ backup
      const provincesData = getProvincesFromBackup();
      setProvinces(provincesData);
    }
  }, [isOpen]);

  // Fetch districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      setLoading(true);
      try {
        // Lấy dữ liệu quận/huyện từ backup
        // Đảm bảo selectedProvince là string để match với key trong data
        const provinceCode = String(selectedProvince);
        const districtsData = getDistrictsFromBackup(provinceCode);
        console.log("Selected Province Code:", provinceCode);
        console.log("Districts Data:", districtsData);
        setDistricts(districtsData || []);
        setWards([]);
        setSelectedDistrict("");
        setSelectedWard("");
      } catch (error) {
        console.error("Error fetching districts:", error);
        setDistricts([]);
      } finally {
        setLoading(false);
      }
    } else {
      setDistricts([]);
      setWards([]);
      setSelectedDistrict("");
      setSelectedWard("");
    }
  }, [selectedProvince]);

  // Fetch wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      setLoading(true);
      try {
        // Lấy dữ liệu phường/xã từ backup
        // Đảm bảo selectedDistrict là string để match với key trong data
        const districtCode = String(selectedDistrict);
        const wardsData = getWardsFromBackup(districtCode);
        console.log("Selected District Code:", districtCode);
        console.log("Wards Data:", wardsData);
        setWards(wardsData || []);
        setSelectedWard("");
      } catch (error) {
        console.error("Error fetching wards:", error);
        setWards([]);
      } finally {
        setLoading(false);
      }
    } else {
      setWards([]);
      setSelectedWard("");
    }
  }, [selectedDistrict]);


  // Update order form when address components change
  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedWard) {
      const province = provinces.find(p => p.code === selectedProvince);
      const district = districts.find(d => d.code === selectedDistrict);
      const ward = wards.find(w => w.code === selectedWard);

      if (province && district && ward) {
        const fullAddress = `${orderForm.address}, ${ward.name}, ${district.name}, ${province.name}`;
        setOrderForm({ ...orderForm, city: fullAddress });
      }
    }
  }, [selectedProvince, selectedDistrict, selectedWard, provinces, districts, wards, orderForm, setOrderForm]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        fullname: orderForm.fullName,
        email: orderForm.email,
        phone: orderForm.phone,
        address: orderForm.address,
        province: provinces.find((p) => String(p.code) === String(selectedProvince))?.name || "",
        district: districts.find((d) => String(d.code) === String(selectedDistrict))?.name || "",
        ward: wards.find((w) => String(w.code) === String(selectedWard))?.name || "",
        note: orderForm.notes,
        products: selectedItems.map((item) => ({
          product_id: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice,
        cupDiscount,
        finalPrice,
      };
      console.log("Body", body)

      await apiClient("/orders/create", {
        method: "POST",
        body: JSON.stringify(body),
      });

      // // Gọi toast từ Cart
      setSuccessMessage("Đặt hàng thành công 🎉");
      clearSelected();
      onClose();

    } catch (error) {
      console.error("Error creating order:", error);
      setSuccessMessage("Có lỗi xảy ra khi đặt hàng ❌");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-start justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-neutral-100">
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


          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Có thể nhập email để nhận được thông báo của chúng tôi"
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
                <span className="label-text text-neutral-700">Địa chỉ chi tiết(Vui lòng điền địa chỉ chi tiết nếu xã của bạn chưa thể chon được) *</span>
              </label>
              <input
                type="text"
                required
                value={orderForm.address}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, address: e.target.value })
                }
                className="input input-bordered w-full border-neutral-200 focus:border-neutral-400 bg-white"
                placeholder="Số nhà, tên đường, tòa nhà..."
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">
                  <span className="label-text text-neutral-700">Tỉnh/Thành phố *</span>
                </label>
                <select
                  required
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="select select-bordered w-full border-neutral-200 focus:border-neutral-400 bg-white"
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
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-neutral-700">Quận/Huyện *</span>
                </label>
                <select
                  required
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedProvince || loading}
                  className="select select-bordered w-full border-neutral-200 focus:border-neutral-400 bg-white disabled:bg-neutral-100 disabled:text-neutral-500"
                  onFocus={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.borderColor = '#20161F';
                      e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.15)';
                      e.target.style.backgroundColor = '#fefefe';
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                    e.target.style.backgroundColor = e.target.disabled ? '#f5f5f5' : 'white';
                  }}
                >
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-neutral-700">Phường/Xã *</span>
                </label>
                <select
                  required
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  disabled={!selectedDistrict || loading}
                  className="select select-bordered w-full border-neutral-200 focus:border-neutral-400 bg-white disabled:bg-neutral-100 disabled:text-neutral-500"
                  onFocus={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.borderColor = '#20161F';
                      e.target.style.boxShadow = '0 0 0 3px rgba(32, 22, 31, 0.15)';
                      e.target.style.backgroundColor = '#fefefe';
                    }
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                    e.target.style.backgroundColor = e.target.disabled ? '#f5f5f5' : 'white';
                  }}
                >
                  <option value="">Chọn phường/xã</option>
                  {wards.map((ward) => (
                    <option key={ward.code} value={ward.code}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
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
                    <span className="text-neutral-700">{item.title || item.name} x{item.quantity}</span>
                    <span className="font-semibold" style={{ color: '#20161F' }}>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}

                {cupDiscount > 0 && (
                  <div className="flex justify-between items-center py-1 text-green-600">
                    <span>🎉 Giảm giá cốc (2 cốc -10%)</span>
                    <span className="font-semibold">-{formatPrice(cupDiscount)}</span>
                  </div>
                )}

                <div className="border-t border-neutral-300 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-neutral-900 text-base">Tổng cộng:</span>
                    <span className="font-bold text-lg" style={{ color: '#20161F' }}>{formatPrice(finalPrice || totalPrice)}</span>
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
    </div >
  );
};

export default CheckoutModal;
