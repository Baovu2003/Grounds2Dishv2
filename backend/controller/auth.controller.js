const { z } = require("zod");
const User = require("../model/user.model.js");
const { sendOTP } = require("../helpers/sendMail.js");

// Validation schemas
const RegisterSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  name: z
    .string()
    .min(1, "Tên không được để trống")
    .max(50, "Tên không được vượt quá 50 ký tự"),
});

const LoginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

const ForgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

const VerifyOTPSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  otp: z.string().length(6, "Mã OTP phải có 6 chữ số"),
});

const ResetPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  otp: z.string().length(6, "Mã OTP phải có 6 chữ số"),
  newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
});

const generateRandomString = (length = 10) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Đăng ký user mới
async function register(req, res, next) {
  try {
    const { email, password, name } = RegisterSchema.parse(req.body);

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email đã được sử dụng",
      });
    }

    // Tạo user mới
    const user = await User.create({
      email,
      password,
      name,
      token: generateRandomString(),
    });

    await user.save();

    res.status(201).json({
      status: "success",
      message: "Đăng ký thành công",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Đăng ký thất bại",
      error: err.message,
    });
  }
}

// Đăng nhập
async function login(req, res, next) {
  try {
    const { email, password } = LoginSchema.parse(req.body);

    // Tìm user và include password để so sánh
    const user = await User.findOne({ email, isActive: true }).select(
      "+password"
    );

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: "error",
        message: "Email hoặc mật khẩu không đúng",
      });
    }

    await user.save();

    res.json({
      status: "success",
      message: "Đăng nhập thành công",
      data: {
        user: user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Đăng nhập thất bại",
      error: err.message,
    });
  }
}

// Quên mật khẩu - gửi OTP
async function forgotPassword(req, res, next) {
  try {
    const { email } = ForgotPasswordSchema.parse(req.body);

    // Tìm user
    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Email không tồn tại trong hệ thống",
      });
    }

    // Tạo OTP và thời gian hết hạn (10 phút)
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 phút

    // Lưu OTP vào database
    user.resetPasswordToken = otp;
    user.resetPasswordExpires = expiresAt;
    await user.save();

    // Gửi OTP qua email
    sendOTP(email, otp);

    res.json({
      status: "success",
      message: "Mã OTP đã được gửi đến email của bạn",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Gửi OTP thất bại",
      error: err.message,
    });
  }
}

// Xác thực OTP
async function verifyOTP(req, res, next) {
  try {
    const { email, otp } = VerifyOTPSchema.parse(req.body);

    // Tìm user với OTP hợp lệ
    const user = await User.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: new Date() },
      isActive: true,
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Mã OTP không hợp lệ hoặc đã hết hạn",
      });
    }

    res.json({
      status: "success",
      message: "Mã OTP hợp lệ",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Xác thực OTP thất bại",
      error: err.message,
    });
  }
}

// Đặt lại mật khẩu
async function resetPassword(req, res, next) {
  try {
    const { email, otp, newPassword } = ResetPasswordSchema.parse(req.body);

    // Tìm user với OTP hợp lệ
    const user = await User.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: new Date() },
      isActive: true,
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Mã OTP không hợp lệ hoặc đã hết hạn",
      });
    }

    // Cập nhật mật khẩu mới
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({
      status: "success",
      message: "Đặt lại mật khẩu thành công",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Đặt lại mật khẩu thất bại",
      error: err.message,
    });
  }
}

module.exports = {
  register,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword,
};
