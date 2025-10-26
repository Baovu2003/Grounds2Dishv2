const nodemailer = require("nodemailer");

module.exports.sendMail = (email, subject, order) => {
  const mailUser = process.env.MAIL_USER;
  const mailPassword = process.env.MAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailUser,
      pass: mailPassword,
    },
  });

  // Tạo bảng HTML cho danh sách sản phẩm
  const productRows = order.products
    .map(
      (p) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${p.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${
          p.quantity
        }</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${p.price.toLocaleString()} ₫</td>
      </tr>
    `
    )
    .join("");

  const totalPrice = order.products
    .reduce((sum, p) => sum + p.price * p.quantity, 0)
    .toLocaleString();

  const displayStatus = {
    pending: "Đang chờ xử lý",
    confirmed: "Đã xác nhận",
    canceled: "Đã hủy",
  };

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body { font-family: Arial, sans-serif; background: #f6f9fc; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
      .header { background: linear-gradient(90deg, #16a34a, #4ade80); color: white; text-align: center; padding: 20px; }
      .header h1 { margin: 0; font-size: 24px; }
      .content { padding: 20px; color: #000; } /* Mặc định chữ nội dung là đen */
      .content h2, .content h3 { color: #16a34a; margin-bottom: 10px; } /* Tiêu đề xanh lá */
      table { width: 100%; border-collapse: collapse; margin-top: 15px; }
      th, td { padding: 8px; border: 1px solid #ddd; }
      th { background-color: #f0fdf4; color: #16a34a; }
      .footer { text-align: center; font-size: 12px; color: #888; padding: 15px; }
      .btn { display: inline-block; background: #16a34a; color: white !important; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px; }
      .green-text { color: #16a34a; }
      .black-text { color: #000; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Grounds2Dish Shop</h1>
      </div>
      <div class="content">
        <h2>Xin chào quý khách</h2>
        <p>Cảm ơn bạn đã đặt hàng tại <strong>Grounds2Dish Shop</strong> 🌱.</p>
        <p><strong class="green-text">Trạng thái:</strong> <span class="black-text">${
          displayStatus[order.status] || order.status
        }</span></p>
        <p><strong class="green-text">Mã đơn hàng:</strong> <span class="black-text">${
          order.id
        }</span></p>
        <p><strong class="green-text">Số điện thoại:</strong> <span class="black-text">${
          order.phone
        }</span></p>
        <p><strong class="green-text">Địa chỉ:</strong> <span class="black-text">${
          order.address
        }</span></p>
        <p><strong class="green-text">Ghi chú:</strong> <span class="black-text">${
          order.note || "Không có"
        }</span></p>

        <h3>Chi tiết đơn hàng:</h3>
        <table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
          </tbody>
          <tfoot>
  <tr>
    <td colspan="2" style="text-align:right; font-weight:bold;">Tạm tính:</td>
    <td style="text-align:right;">${order.totalPrice.toLocaleString()} ₫</td>
  </tr>

  ${
    order.cupDiscount > 0
      ? `<tr>
           <td colspan="2" style="text-align:right; color:green; font-weight:bold;">Giảm giá (10% cốc):</td>
           <td style="text-align:right; color:green;">- ${order.cupDiscount.toLocaleString()} ₫</td>
         </tr>`
      : ""
  }

  <tr>
    <td colspan="2" style="text-align:right; font-weight:bold;">Tổng cộng:</td>
    <td style="text-align:right; font-weight:bold;">${order.finalPrice.toLocaleString()} ₫</td>
  </tr>
</tfoot>

        </table>

        <p>Nếu bạn có bất kỳ thắc mắc nào, hãy liên hệ với chúng tôi qua email hoặc hotline.</p>
      </div>
      <div class="footer">
        © 2025 Grounds2Dish Shop. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: `"Grounds2Dish Shop" <${mailUser}>`,
    to: email,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Function gửi OTP cho quên mật khẩu
module.exports.sendOTP = (email, otp) => {
  const mailUser = process.env.MAIL_USER;
  const mailPassword = process.env.MAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailUser,
      pass: mailPassword,
    },
  });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body { font-family: Arial, sans-serif; background: #f6f9fc; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
      .header { background: linear-gradient(90deg, #16a34a, #4ade80); color: white; text-align: center; padding: 20px; }
      .header h1 { margin: 0; font-size: 24px; }
      .content { padding: 20px; color: #000; }
      .content h2, .content h3 { color: #16a34a; margin-bottom: 10px; }
      .otp-box { background: #f0fdf4; border: 2px solid #16a34a; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
      .otp-code { font-size: 32px; font-weight: bold; color: #16a34a; letter-spacing: 5px; }
      .footer { text-align: center; font-size: 12px; color: #888; padding: 15px; }
      .warning { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 15px 0; color: #92400e; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Grounds2Dish Shop</h1>
      </div>
      <div class="content">
        <h2>Mã OTP đặt lại mật khẩu</h2>
        <p>Xin chào,</p>
        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình tại <strong>Grounds2Dish Shop</strong> 🌱.</p>
        
        <div class="otp-box">
          <h3>Mã OTP của bạn:</h3>
          <div class="otp-code">${otp}</div>
        </div>
        
        <div class="warning">
          <strong>Lưu ý:</strong> Mã OTP này có hiệu lực trong 10 phút. Vui lòng không chia sẻ mã này với bất kỳ ai.
        </div>
        
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        <p>Trân trọng,<br>Đội ngũ Grounds2Dish Shop</p>
      </div>
      <div class="footer">
        © 2025 Grounds2Dish Shop. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: `"Grounds2Dish Shop" <${mailUser}>`,
    to: email,
    subject: "Mã OTP đặt lại mật khẩu - Grounds2Dish Shop",
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error occurred:", error);
    } else {
      console.log("OTP Email sent:", info.response);
    }
  });
};
