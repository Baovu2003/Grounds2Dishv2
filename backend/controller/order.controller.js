const Order = require("../model/order.model");
const { sendMail } = require("../helpers/sendMail");

// [POST] /api/orders/create
module.exports.createOrder = async (req, res) => {
  console.log("req.body", req.body);
  try {
    // Tạo order mới từ body
    const newOrder = new Order({
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address, // số nhà, tên đường
      province: req.body.province,
      district: req.body.district,
      ward: req.body.ward,
      note: req.body.note,
      products: req.body.products,
      totalPrice: req.body.totalPrice,
      cupDiscount: req.body.cupDiscount,
      finalPrice: req.body.finalPrice,
      status: "pending",
      isPaid: false,
    });

    console.log("newOrder", newOrder);
    await newOrder.save();
    console.log("New order:", newOrder);

    // Lấy order đã populate product_id để có title
    const populatedOrder = await Order.findById(newOrder._id).populate(
      "products.product_id"
    );

    // Nếu có email thì gửi mail xác nhận
    if (populatedOrder.email) {
      const recipientEmail = populatedOrder.email;

      const orderToSend = {
        id: populatedOrder._id, // hoặc orderId
        status: populatedOrder.status,
        fullname: populatedOrder.fullname,
        email: recipientEmail,
        phone: populatedOrder.phone,
        address: populatedOrder.address,
        province: populatedOrder.province,
        district: populatedOrder.district,
        ward: populatedOrder.ward,
        note: populatedOrder.note,
        products: populatedOrder.products.map((p) => ({
          name: p.product_id?.title || "Sản phẩm",
          quantity: p.quantity,
          price: p.price,
        })),
        totalPrice: populatedOrder.totalPrice,
        cupDiscount: populatedOrder.cupDiscount,
        finalPrice: populatedOrder.finalPrice,
      };

      console.log("Order to send:", orderToSend);
      sendMail(recipientEmail, "Xác nhận đơn hàng của bạn", orderToSend);
    }

    res.json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// [GET] /api/orders - Admin xem tất cả đơn
module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product_id");
    console.log(orders);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [PATCH] /api/orders/status/:id - Admin cập nhật trạng thái
module.exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    console.log("status", status);
    const allowed = ["pending", "confirmed", "canceled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("products.product_id");
    console.log("order", order);
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Gửi mail thông báo trạng thái thay đổi
    if (order.email) {
      let subject = "";
      if (status === "confirmed")
        subject = "Đơn hàng của bạn đã được xác nhận ✅";
      else if (status === "canceled") subject = "Đơn hàng của bạn đã bị hủy ❌";

      if (subject) {
        const orderToSend = {
          id: order._id,
          status: order.status,
          fullname: order.fullname,
          email: order.email,
          phone: order.phone,
          address: order.address,
          province: order.province,
          district: order.district,
          ward: order.ward,
          note: order.note,
          products: order.products.map((p) => ({
            name: p.product_id?.title || "Sản phẩm",
            quantity: p.quantity,
            price: p.price,
          })),
          totalPrice: order.totalPrice,
          cupDiscount: order.cupDiscount,
          finalPrice: order.finalPrice,
        };
        console.log("orderToSend", orderToSend);

        sendMail(order.email, subject, orderToSend);
      }
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// [PATCH] /api/orders/payments/:id - Admin xác nhận thanh toán
module.exports.updatePaymentStatus = async (req, res) => {
  try {
    const { isPaid } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { isPaid },
      { new: true }
    ).populate("products.product_id");

    if (!order) return res.status(404).json({ error: "Order not found" });

    // Gửi mail xác nhận thanh toán thành công (tùy chọn)
    if (isPaid && order.email) {
      const subject = "Xác nhận thanh toán đơn hàng của bạn 💰";
      const orderToSend = {
        id: order._id,
        status: order.status,
        isPaid: order.isPaid,
        fullname: order.fullname,
        email: order.email,
        phone: order.phone,
        address: order.address,
        province: order.province,
        district: order.district,
        ward: order.ward,
        note: order.note,
        products: order.products.map((p) => ({
          name: p.product_id?.title || "Sản phẩm",
          quantity: p.quantity,
          price: p.price,
        })),
        totalPrice: order.totalPrice,
        cupDiscount: order.cupDiscount,
        finalPrice: order.finalPrice,
      };
      console.log("orderToSend", orderToSend);

      sendMail(order.email, subject, orderToSend);
    }
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
