const Order = require("../model/order.model");
const { sendMail } = require("../helpers/sendMail");

// [POST] /api/orders/create
module.exports.createOrder = async (req, res) => {
  try {
    // Tạo order mới
    const newOrder = new Order({
      ...req.body,
      status: "pending",
    });

    await newOrder.save();
    console.log("New order:", newOrder);

    // Lấy order đã populate product_id để có title
    const populatedOrder = await Order.findById(newOrder._id).populate(
      "products.product_id"
    );

    if (populatedOrder.email) {
      const recipientEmail = populatedOrder.email;
      const orderToSend = {
        ...populatedOrder._doc,
        email: recipientEmail,
        phone: populatedOrder.phone,
        address: populatedOrder.address,
        note: populatedOrder.note,
        products: populatedOrder.products.map((p) => ({
          name: p.product_id?.title || "Sản phẩm",
          quantity: p.quantity,
          price: p.price,
        })),
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
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// [PATCH] /api/orders/status/:id - Admin cập nhật trạng thái
module.exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "confirmed", "canceled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("products.product_id");

    if (!order) return res.status(404).json({ error: "Order not found" });

    // Gửi mail thông báo trạng thái thay đổi
    const recipientEmail = order.userInfo?.email || order.email;
    if (recipientEmail) {
      let subject = "";
      if (status === "confirmed")
        subject = "Đơn hàng của bạn đã được xác nhận ✅";
      else if (status === "canceled") subject = "Đơn hàng của bạn đã bị hủy ❌";

      if (subject) {
        const orderToSend = {
          ...order._doc,
          email: recipientEmail,
          phone: order.phone,
          address: order.address,
          note: order.note,
          products: order.products.map((p) => ({
            name: p.product_id?.title || "Sản phẩm",
            quantity: p.quantity,
            price: p.price,
          })),
        };

        sendMail(recipientEmail, subject, orderToSend);
      }
    }

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
