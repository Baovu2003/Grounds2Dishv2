import React, { useEffect, useState } from "react";

const PAGE_SIZE = 5; // số đơn mỗi trang

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // filter & pagination state
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Lấy danh sách order
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/orders");
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    // Cập nhật trạng thái đơn hàng
    const updateStatus = async (id, status) => {
        try {
            await fetch(`http://localhost:5000/api/orders/status/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            fetchOrders();
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Filter orders theo tên hoặc sdt
    const filteredOrders = orders.filter(
        (order) =>
            order.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phone.includes(searchTerm)
    );

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );
    // Hàm tạo danh sách số trang (với dấu ...)
    const getPageNumbers = (totalPages, currentPage) => {
        const delta = 2; // số trang hiển thị trước/sau current
        const range = [];
        const rangeWithDots = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        let prev
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


    if (loading) return <p className="p-5">Loading...</p>;

    return (
        <div className="p-5">
            <h1 className="text-xl font-bold mb-4">Quản lý đơn hàng</h1>

            {/* Search */}
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Tìm theo tên hoặc SĐT..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // reset về trang 1 khi search
                    }}
                    className="border rounded px-3 py-2 w-64"
                />
            </div>

            {/* Table */}
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 border">Khách hàng</th>
                        <th className="p-3 border">Sản phẩm</th>
                        <th className="p-3 border">Trạng thái</th>
                        <th className="p-3 border">Ngày tạo</th>
                        <th className="p-3 border">Hành động</th>
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
                        paginatedOrders.map((order) => (
                            <tr key={order._id} className="border-t hover:bg-gray-50">
                                <td className="p-3 border">
                                    <div>
                                        <p className="font-medium">{order.fullname}</p>
                                        <p className="text-sm text-gray-600">{order.email}</p>
                                        <p className="text-sm text-gray-600">{order.phone}</p>
                                        <p className="text-sm">
                                            {order.address}, {order.ward}, {order.district}, {order.province}
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
                                <td className="p-3 border">
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                                <td className="p-3 border text-center space-x-2">
                                    {order.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(order._id, "confirmed")}
                                                className="px-3 py-1 bg-green-500 text-white rounded"
                                            >
                                                Xác nhận
                                            </button>
                                            <button
                                                onClick={() => updateStatus(order._id, "canceled")}
                                                className="px-3 py-1 bg-red-500 text-white rounded"
                                            >
                                                Hủy
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
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

        </div>
    );
};

export default AdminOrder;
