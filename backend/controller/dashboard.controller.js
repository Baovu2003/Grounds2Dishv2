const Order = require("../model/order.model");
const Product = require("../model/product.model");

const getDashboardOverview = async (req, res) => {
  try {
    // 1️⃣ Tổng số đơn hàng theo trạng thái
    const [totalConfirmed, totalPending, totalCanceled] = await Promise.all([
      Order.countDocuments({ status: "confirmed" }),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "canceled" }),
    ]);

    // 2️⃣ Tổng số lượng sản phẩm đã bán
    const totalProductsResult = await Order.aggregate([
      { $match: { status: "confirmed" } },
      { $unwind: "$products" },
      {
        $group: { _id: null, totalQuantity: { $sum: "$products.quantity" } },
      },
    ]);
    const totalProductsSold = totalProductsResult[0]?.totalQuantity || 0;

    // 3️⃣ Tổng doanh thu từ tất cả đơn hàng confirmed
    const totalRevenueResult = await Order.aggregate([
      { $match: { status: "confirmed" } },
      { $unwind: "$products" },
      {
        $group: {
          _id: null,
          revenue: {
            $sum: { $multiply: ["$products.quantity", "$products.price"] },
          },
        },
      },
    ]);
    const totalRevenue = totalRevenueResult[0]?.revenue || 0;

    // 4️⃣ Top 5 sản phẩm bán chạy nhất
    const bestSellingProducts = await Order.aggregate([
      { $match: { status: "confirmed" } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product_id",
          totalSold: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          title: "$product.title",
          totalSold: 1,
        },
      },
    ]);

    // 5️⃣ Thống kê toàn bộ sản phẩm bán được
    const productsSales = await Order.aggregate([
      { $match: { status: "confirmed" } },
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product_id",
          totalSold: { $sum: "$products.quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          title: "$product.title",
          totalSold: 1,
        },
      },
      { $sort: { totalSold: -1 } },
    ]);

    // 6️⃣ Doanh thu theo từng tháng
    const monthlyRevenue = await Order.aggregate([
      { $match: { status: "confirmed" } },
      { $unwind: "$products" },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: {
            $sum: { $multiply: ["$products.quantity", "$products.price"] },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          revenue: 1,
        },
      },
    ]);

    // ✅ Trả về gộp tất cả trong 1 response
    res.json({
      totalOrders: { totalConfirmed, totalPending, totalCanceled },
      totalProductsSold,
      totalRevenue,
      bestSellingProducts,
      productsSales,
      monthlyRevenue,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

module.exports = {
  getDashboardOverview,
};
