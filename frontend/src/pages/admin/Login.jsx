import React, { useState, useEffect } from "react";
import { apiClient } from "../../constants/apiUrl";

const Login = () => {
    const [step, setStep] = useState("login");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success"); // success hoặc error
    const [form, setForm] = useState({
        email: "",
        password: "",
        otp: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Auto hide toast sau 3s
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const showMessage = (msg, type = "success") => {
        setMessage(msg);
        setType(type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (step === "login") {
                const data = await apiClient("/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: form.email,
                        password: form.password,
                    }),
                });

                showMessage("Đăng nhập thành công!", "success");
                localStorage.setItem("token", data.data.user.token);
                localStorage.setItem("user", JSON.stringify(data.data.user));

                // Redirect sau khi toast hiển thị 1s
                setTimeout(() => {
                    window.location.href = "/admin";
                }, 1000);
            }

            if (step === "forgot") {
                await apiClient("/auth/forgot-password", {
                    method: "POST",
                    body: JSON.stringify({ email: form.email }),
                });

                showMessage("OTP đã được gửi về email.", "success");
                setStep("reset");
            }

            if (step === "reset") {
                // Verify OTP
                await apiClient("/auth/verify-otp", {
                    method: "POST",
                    body: JSON.stringify({
                        email: form.email,
                        otp: form.otp,
                    }),
                });

                // Reset password
                await apiClient("/auth/reset-password", {
                    method: "POST",
                    body: JSON.stringify({
                        email: form.email,
                        otp: form.otp,
                        newPassword: form.newPassword,
                    }),
                });

                showMessage("Mật khẩu đã được đặt lại thành công!", "success");
                setStep("login");
            }
        } catch (err) {
            showMessage(err.message || "Có lỗi xảy ra!", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 relative">
            {/* Toast */}
            <div className="toast toast-top toast-end z-50 fixed top-5 right-5">
                {message && (
                    <div className={`alert alert-${type} shadow-lg`}>
                        <div>
                            <span>{message}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="card w-full max-w-md shadow-xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">
                        {step === "login" && "Admin Login"}
                        {step === "forgot" && "Quên mật khẩu"}
                        {step === "reset" && "Đặt lại mật khẩu"}
                    </h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="admin@gmail.com"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {step === "login" && (
                            <>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Mật khẩu</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="********"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full"
                                >
                                    {loading ? "Đang xử lý..." : "Đăng nhập"}
                                </button>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="link link-primary"
                                        onClick={() => setStep("forgot")}
                                    >
                                        Quên mật khẩu?
                                    </button>
                                </div>
                            </>
                        )}

                        {step === "forgot" && (
                            <>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full"
                                >
                                    {loading ? "Đang gửi..." : "Gửi OTP"}
                                </button>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="link"
                                        onClick={() => setStep("login")}
                                    >
                                        Quay lại đăng nhập
                                    </button>
                                </div>
                            </>
                        )}

                        {step === "reset" && (
                            <>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Mã OTP</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="otp"
                                        value={form.otp}
                                        onChange={handleChange}
                                        required
                                        placeholder="Nhập mã OTP"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Mật khẩu mới</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={form.newPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="********"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full"
                                >
                                    {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                                </button>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        className="link"
                                        onClick={() => setStep("login")}
                                    >
                                        Quay lại đăng nhập
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
