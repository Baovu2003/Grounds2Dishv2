const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Xuất hàm cấu hình multer
module.exports = () => {
    // Khai báo cấu hình lưu trữ cho multer
    const storage = multer.diskStorage({
        // Hàm xác định thư mục lưu trữ
        destination: function (req, file, cb) {
            // Dùng đường dẫn tuyệt đối để tránh sai base dir khi chạy bằng Docker/PM2
            const uploadDir = path.join(__dirname, "../public/uploads");
            // Đảm bảo thư mục tồn tại (tạo nếu chưa có)
            try {
                fs.mkdirSync(uploadDir, { recursive: true });
            } catch (err) {
                return cb(err);
            }
            cb(null, uploadDir);
        },
        // Hàm xác định tên file khi lưu
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now();  // Tạo tên file duy nhất bằng cách sử dụng timestamp
            // Gọi callback với tên file bao gồm timestamp và tên file gốc
            cb(null, `${uniqueSuffix}-${file.originalname}`);  // Lưu file với tên duy nhất
        }
    });

    return storage;  // Trả về đối tượng storage để có thể sử dụng trong multer
};
