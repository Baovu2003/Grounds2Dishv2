// src/utils/apiClient.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3002/api";

// Hàm lấy token từ localStorage
const getToken = () => localStorage.getItem("token");

// Request thường (không cần token)
export const apiClient = async (endpoint, options = {}) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || `API error: ${res.status}`);
  }
  return data;
};

// Request admin (tự động gắn token)
export const apiAdminClient = async (endpoint, options = {}) => {
  const token = getToken();
  if (!token) throw new Error("Không tìm thấy token, vui lòng đăng nhập lại");

  const isFormData = options && options.body instanceof FormData;

  const headers = {
    Authorization: `Bearer ${token}`,
    ...(options.headers || {}),
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers,
    ...options,
  });

  let data;
  try {
    data = await res.json(); // parse JSON từ backend
  } catch {
    data = {};
  }

  if (!res.ok) {
    // Nếu backend trả về message, hiển thị đúng thông báo
    throw new Error(data.message || `API error: ${res.status}`);
  }

  return data;
};
