import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { apiAdminClient } from "../../constants/apiUrl";
import Bill from "../Bill";
const PAGE_SIZE = 5; // số đơn mỗi trang

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter & pagination state
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState(""); // "" = tất cả trạng thái
    const [currentPage, setCurrentPage] = useState(1);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [confirmModal, setConfirmModal] = useState(null); // { orderId, action, message }
    const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: string }

    console.log("selectedOrder", selectedOrder)
    // Lấy danh sách order
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await apiAdminClient("/orders");
            // Xử lý response - đảm bảo luôn là array
            const ordersData = Array.isArray(data) ? data : (data?.data || []);
            setOrders(ordersData);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    // Cập nhật trạng thái đơn hàng
    const updateStatus = async (id, status) => {
        try {
            await apiAdminClient(`/orders/status/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            });
            setConfirmModal(null); // Đóng modal sau khi thành công
            
            // Hiển thị thông báo thành công
            const successMessages = {
                confirmed: "✅ Xác nhận đơn hàng thành công!",
                canceled: "✅ Hủy đơn hàng thành công!"
            };
            setNotification({
                type: 'success',
                message: successMessages[status] || "✅ Cập nhật trạng thái thành công!"
            });
            
            // Tự động ẩn thông báo sau 3 giây
            setTimeout(() => setNotification(null), 3000);
            
            fetchOrders();
        } catch (err) {
            console.error("Error updating status:", err);
            setConfirmModal(null); // Đóng modal nếu có lỗi
            
            // Hiển thị thông báo lỗi
            setNotification({
                type: 'error',
                message: "❌ Có lỗi xảy ra khi cập nhật trạng thái!"
            });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    // Hàm xử lý khi click nút xác nhận hoặc hủy
    const handleStatusAction = (orderId, status, orderName) => {
        const actionMessages = {
            confirmed: `Bạn có chắc chắn muốn xác nhận đơn hàng của "${orderName}"?`,
            canceled: `Bạn có chắc chắn muốn hủy đơn hàng của "${orderName}"?`
        };
        
        setConfirmModal({
            orderId,
            action: 'status',
            status,
            message: actionMessages[status] || 'Bạn có chắc chắn muốn thực hiện hành động này?'
        });
    };
    // ✅ Hàm cập nhật thanh toán
    const updatePayment = async (id, isPaid) => {
        try {
            await apiAdminClient(`/orders/payments/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ isPaid }), // ✅ gửi đúng field
            });
            setConfirmModal(null); // Đóng modal sau khi thành công
            
            // Hiển thị thông báo thành công
            setNotification({
                type: 'success',
                message: "✅ Xác nhận thanh toán thành công!"
            });
            setTimeout(() => setNotification(null), 3000);
            
            fetchOrders();
        } catch (err) {
            console.error("Error updating payment:", err);
            setConfirmModal(null); // Đóng modal nếu có lỗi
            
            // Hiển thị thông báo lỗi
            setNotification({
                type: 'error',
                message: "❌ Có lỗi xảy ra khi cập nhật thanh toán!"
            });
            setTimeout(() => setNotification(null), 3000);
        }
    };

    // Hàm xử lý khi click nút xác nhận thanh toán
    const handlePaymentAction = (orderId, orderName) => {
        setConfirmModal({
            orderId,
            action: 'payment',
            message: `Bạn có chắc chắn muốn xác nhận thanh toán cho đơn hàng của "${orderName}"?`
        });
    };

    // Hàm xác nhận và thực hiện hành động
    const handleConfirm = () => {
        if (!confirmModal) return;
        
        if (confirmModal.action === 'status') {
            updateStatus(confirmModal.orderId, confirmModal.status);
        } else if (confirmModal.action === 'payment') {
            updatePayment(confirmModal.orderId, true);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Filter orders theo tên, sdt và trạng thái
    const filteredOrders = Array.isArray(orders) ? orders.filter((order) => {
        const matchesSearch =
            order.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phone?.includes(searchTerm);

        const matchesStatus = statusFilter ? order.status === statusFilter : true;

        let matchesDate = true;
        const orderDate = new Date(order.createdAt);
        if (fromDate) matchesDate = orderDate >= new Date(fromDate);
        if (toDate) matchesDate = matchesDate && orderDate <= new Date(toDate);

        return matchesSearch && matchesStatus && matchesDate;
    }) : [];


    // Pagination
    const totalPages = Array.isArray(filteredOrders)
        ? Math.ceil(filteredOrders.length / PAGE_SIZE)
        : 0;
    const paginatedOrders = Array.isArray(filteredOrders)
        ? filteredOrders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
        : [];

    // Hàm tạo danh sách số trang (với dấu ...)
    const getPageNumbers = (totalPages, currentPage) => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        let prev;
        for (let i of range) {
            if (prev) {
                if (i - prev === 2) {
                    rangeWithDots.push(prev + 1);
                } else if (i - prev > 2) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            prev = i;
        }

        return rangeWithDots;
    };
    // Hàm xuất file Excel
    const exportToExcel = () => {
        if (orders.length === 0) return;

        // Map dữ liệu thành dạng mảng object dễ đọc
        const data = orders.map((order) => ({
            "Khách hàng": order.fullname,
            "Email": order.email,
            "SĐT": order.phone,
            "Địa chỉ": `${order.address}, ${order.ward}, ${order.district}, ${order.province}`,
            "Trạng thái": order.status,
            "Thanh toán": order.isPaid ? "Thanh toán thành công" : "Chưa thanh toán",
            "Ngày tạo": new Date(order.createdAt).toLocaleString(),
            "Sản phẩm": order.products
                .map((p) => `${p.product_id?.title} x${p.quantity} = ${p.price * p.quantity}đ`)
                .join("; "),
        }));

        // Tạo worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Tạo workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        // Xuất file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(blob, `Orders_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };
    if (loading) return <p className="p-5">Loading...</p>;

    return (
        <div className="p-5">
            {/* Notification Toast */}
            {notification && (
                <div 
                    className={`fixed top-4 right-4 z-[60] ${
                        notification.type === 'success' 
                            ? 'bg-green-500' 
                            : 'bg-red-500'
                    } text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md transition-all duration-300 transform translate-x-0 animate-[slideIn_0.3s_ease-out]`}
                    style={{
                        animation: 'slideIn 0.3s ease-out'
                    }}
                >
                    <style>{`
                        @keyframes slideIn {
                            from {
                                transform: translateX(100%);
                                opacity: 0;
                            }
                            to {
                                transform: translateX(0);
                                opacity: 1;
                            }
                        }
                    `}</style>
                    <span className="text-xl">{notification.type === 'success' ? '✅' : '❌'}</span>
                    <span className="font-medium flex-1">{notification.message}</span>
                    <button
                        onClick={() => setNotification(null)}
                        className="ml-2 text-white hover:text-gray-200 font-bold text-lg transition-colors"
                    >
                        ✕
                    </button>
                </div>
            )}

            <h1 className="text-xl font-bold mb-4">Quản lý đơn hàng</h1>

            {/* Search & Status Filter */}
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Tìm theo tên hoặc SĐT..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border rounded px-3 py-2 w-64"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border rounded px-3 py-2 w-48"
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="canceled">Canceled</option>
                </select>
                {/* Filter theo ngày */}
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border rounded px-3 py-2"
                />
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border rounded px-3 py-2"
                />
                <button
                    onClick={exportToExcel}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Xuất Excel
                </button>
            </div>

            {/* Table */}
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 border">Khách hàng</th>
                        <th className="p-3 border">Sản phẩm</th>
                        <th className="p-2">Tổng tiền-Giảm giá-Thành Tiền</th>
                        <th className="p-3 border">Ngày tạo</th>
                        <th className="p-3 border">Trạng thái</th>
                        <th className="p-3 border">Hành động</th>
                        <th className="p-3 border">Thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedOrders.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center p-5">
                                Không có đơn hàng
                            </td>
                        </tr>
                    ) : (
                        Array.isArray(paginatedOrders) && paginatedOrders.map((order) => (
                            <tr key={order._id} className="border-t hover:bg-gray-50">
                                <td className="p-3 border">
                                    <div>
                                        <p className="font-medium">{order.fullname}</p>
                                        <p className="text-sm text-gray-600"><span><strong>Email:</strong></span> {order.email}</p>
                                        <p className="text-sm text-gray-600"><span><strong>Phone:</strong></span> {order.phone}</p>
                                        <p className="text-sm">
                                            <span><strong>Address:</strong></span> {order.address}, {order.ward}, {order.district}, {order.province}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-3 border">
                                    <ul className="list-disc ml-5 text-sm">
                                        {order.products.map((p, idx) => (
                                            <li key={idx}>
                                                {p.product_id?.title} x {p.quantity} ={" "}
                                                {(p.price * p.quantity).toLocaleString()} đ
                                            </li>
                                        ))}
                                    </ul>
                                </td>

                                <td className="p-2 text-red-600">
                                    {order.totalPrice?.toLocaleString()}₫
                                    <span className="text-gray-500 mx-1">-</span>
                                    {order.cupDiscount?.toLocaleString()}₫
                                    <span className="text-gray-500 mx-1">=</span>
                                    <span className="text-green-700 font-semibold">
                                        {order.finalPrice?.toLocaleString()}₫
                                    </span>
                                </td>
                                <td className="p-3 border">
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                                <td className="p-3 border">
                                    <span
                                        className={`px-3 py-1 rounded text-xs font-medium ${order.status === "pending"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : order.status === "confirmed"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>


                                <td className="p-3 border text-center space-x-2">
                                    {order.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => handleStatusAction(order._id, "confirmed", order.fullname)}
                                                className="px-3 py-1 bg-green-500 text-white rounded mb-2 hover:bg-green-600 transition-colors"
                                            >
                                                Xác nhận
                                            </button>
                                            <button
                                                onClick={() => handleStatusAction(order._id, "canceled", order.fullname)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                            >
                                                Hủy
                                            </button>
                                        </>
                                    )}
                                    {order.status === "confirmed" && (
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded"
                                        >
                                            Xem bill
                                        </button>
                                    )}

                                    {order.status === "canceled" && (
                                        <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded">
                                            Đã hủy
                                        </span>
                                    )}
                                </td>
                                <td className="p-3 border text-center">
                                    {order.isPaid ? (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                            Đã thanh toán
                                        </span>
                                    ) : order.status === "confirmed" ? (
                                        <button
                                            onClick={() => handlePaymentAction(order._id, order.fullname)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600 transition-colors"
                                        >
                                            Xác nhận thanh toán
                                        </button>
                                    ) : order.status === "pending" ? (
                                        <span className="px-3 py-1  text-red-500 font-bold rounded text-xs ">
                                            Chưa xác nhận đơn
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1  text-gray-900 rounded text-xs font-bold">
                                            Đơn hàng đã hủy.Không thể thanh toán
                                        </span>
                                    )}
                                </td>



                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center items-center gap-2">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Trước
                </button>

                {getPageNumbers(totalPages, currentPage).map((num, idx) =>
                    num === "..." ? (
                        <span key={idx} className="px-3 py-1">
                            ...
                        </span>
                    ) : (
                        <button
                            key={num}
                            className={`px-3 py-1 border rounded ${num === currentPage ? "bg-blue-500 text-white" : "bg-gray-100"
                                }`}
                            onClick={() => setCurrentPage(num)}
                        >
                            {num}
                        </button>
                    )
                )}

                <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Sau
                </button>
            </div>

            {/* Confirmation Modal */}
            {confirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative">
                        <button
                            onClick={() => setConfirmModal(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        >
                            ✕
                        </button>
                        
                        <div className="mt-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Xác nhận hành động
                            </h3>
                            <p className="text-gray-700 mb-6">
                                {confirmModal.message}
                            </p>
                            
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setConfirmModal(null)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${
                                        confirmModal.status === 'canceled' || confirmModal.action === 'payment'
                                            ? 'bg-red-500 hover:bg-red-600'
                                            : 'bg-green-500 hover:bg-green-600'
                                    }`}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bill Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-[700px] max-h-[90vh] relative overflow-y-auto">
                        {/* Nút đóng */}
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="sticky top-2 right-2 float-right mr-2 text-gray-600 hover:text-black z-10"
                        >
                            ✕
                        </button>

                        {/* Nội dung Bill */}
                        <Bill billData={selectedOrder} />
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminOrder;
