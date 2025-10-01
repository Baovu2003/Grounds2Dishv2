import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Calendar, Package, CreditCard, MapPin, Phone, Mail, User, FileText, CheckCircle, Clock, XCircle } from "lucide-react";

const Bill = ({ orderId }) => {
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample bill data - replace with actual API call
  const sampleBillData = {
    orderId: "G2D-2024-001234",
    orderDate: "2024-01-15T10:30:00Z",
    status: "delivered", // pending, confirmed, shipping, delivered, cancelled
    customer: {
      fullName: "Nguyễn Văn A",
      phone: "0123456789",
      email: "nguyenvana@email.com",
      address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
    },
    items: [
      {
        id: 1,
        name: "Bộ Bát Đĩa Sinh Học Premium",
        price: 450000,
        quantity: 2,
        thumbnail: "/images/anh1.jpg",
        description: "Bộ bát đĩa được làm từ bã cà phê và nhựa sinh học"
      },
      {
        id: 2,
        name: "Thìa Muỗng Eco-Friendly Set",
        price: 180000,
        quantity: 1,
        thumbnail: "/images/anh2.jpg",
        description: "Bộ thìa muỗng sinh học từ bã cà phê"
      }
    ],
    subtotal: 1080000,
    shipping: 50000,
    total: 1130000,
    paymentMethod: "COD",
    notes: "Giao hàng vào buổi chiều"
  };

  useEffect(() => {
    // Simulate API call
    const fetchBillData = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setBillData(sampleBillData);
      } catch (error) {
        console.error("Error fetching bill data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBillData();
  }, [orderId]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: { 
        label: "Chờ xác nhận", 
        color: "text-yellow-600", 
        bgColor: "bg-yellow-100", 
        icon: Clock 
      },
      confirmed: { 
        label: "Đã xác nhận", 
        color: "text-blue-600", 
        bgColor: "bg-blue-100", 
        icon: CheckCircle 
      },
      shipping: { 
        label: "Đang giao hàng", 
        color: "text-purple-600", 
        bgColor: "bg-purple-100", 
        icon: Package 
      },
      delivered: { 
        label: "Đã giao hàng", 
        color: "text-green-600", 
        bgColor: "bg-green-100", 
        icon: CheckCircle 
      },
      cancelled: { 
        label: "Đã hủy", 
        color: "text-red-600", 
        bgColor: "bg-red-100", 
        icon: XCircle 
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header Skeleton */}
            <div className="card mb-8">
              <div className="animate-pulse">
                <div className="h-8 bg-neutral-200 rounded-lg w-1/3 mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
              </div>
            </div>

            {/* Customer Info Skeleton */}
            <div className="card mb-8">
              <div className="animate-pulse">
                <div className="h-6 bg-neutral-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Items Skeleton */}
            <div className="card mb-8">
              <div className="animate-pulse">
                <div className="h-6 bg-neutral-200 rounded w-1/4 mb-6"></div>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-20 h-20 bg-neutral-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                        <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                        <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Skeleton */}
            <div className="card">
              <div className="animate-pulse">
                <div className="h-6 bg-neutral-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                  <div className="h-6 bg-neutral-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!billData) {
    return (
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card text-center py-16">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Không tìm thấy hóa đơn</h2>
              <p className="text-neutral-600 mb-6">Hóa đơn bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
              <Link to="/" className="btn-primary">
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(billData.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="card mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl" style={{ backgroundColor: '#20161F' }}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-neutral-800">Hóa đơn đơn hàng</h1>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold" style={{ color: '#20161F' }}>
                    Mã đơn hàng: {billData.orderId}
                  </p>
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Calendar className="w-4 h-4" />
                    <span>Ngày đặt: {formatDate(billData.orderDate)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-4">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusInfo.bgColor}`}>
                  <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                  <span className={`font-semibold ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold" style={{ color: '#20161F' }}>
                    {formatPrice(billData.total)}
                  </p>
                  <p className="text-sm text-neutral-600">Tổng thanh toán</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="card mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-blue-100">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-neutral-800">Thông tin khách hàng</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-neutral-500" />
                  <div>
                    <p className="text-sm text-neutral-600">Họ và tên</p>
                    <p className="font-semibold text-neutral-800">{billData.customer.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neutral-500" />
                  <div>
                    <p className="text-sm text-neutral-600">Số điện thoại</p>
                    <p className="font-semibold text-neutral-800">{billData.customer.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neutral-500" />
                  <div>
                    <p className="text-sm text-neutral-600">Email</p>
                    <p className="font-semibold text-neutral-800">{billData.customer.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neutral-500 mt-1" />
                  <div>
                    <p className="text-sm text-neutral-600">Địa chỉ giao hàng</p>
                    <p className="font-semibold text-neutral-800">{billData.customer.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="card mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-green-100">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-neutral-800">Sản phẩm đã đặt</h2>
            </div>
            
            <div className="space-y-4">
              {billData.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors duration-300">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-neutral-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-neutral-600 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-neutral-600">Số lượng: {item.quantity}</span>
                        <span className="text-sm text-neutral-600">Đơn giá: {formatPrice(item.price)}</span>
                      </div>
                      <div className="font-bold text-lg" style={{ color: '#20161F' }}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="card mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-purple-100">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-neutral-800">Tổng kết đơn hàng</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-600">Tạm tính:</span>
                <span className="font-semibold text-neutral-800">{formatPrice(billData.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-600">Phí vận chuyển:</span>
                <span className="font-semibold text-neutral-800">{formatPrice(billData.shipping)}</span>
              </div>
              <div className="border-t border-neutral-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-neutral-800">Tổng cộng:</span>
                  <span className="text-2xl font-bold" style={{ color: '#20161F' }}>
                    {formatPrice(billData.total)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">Phương thức thanh toán:</p>
                  <p className="font-semibold text-neutral-800">
                    {billData.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng (COD)' : billData.paymentMethod}
                  </p>
                </div>
                {billData.notes && (
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Ghi chú:</p>
                    <p className="font-semibold text-neutral-800">{billData.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-secondary">
              Về trang chủ
            </Link>
            <Link to="/shop" className="btn-primary">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;
