import { z } from "zod";
import User from "../model/user.model.js";

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

const generateRandomString = (length = 10) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Đăng ký user mới
export async function register(req, res, next) {
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
        ...tokens,
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
export async function login(req, res, next) {
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

export default {
  register,
  login,
};
