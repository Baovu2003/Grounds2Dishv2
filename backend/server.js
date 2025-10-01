const express = require("express");
const cors = require("cors");

const app = express();
// Middleware để parse JSON
app.use(express.json());
require("dotenv").config();
app.use(cors());
const PORT = process.env.PORT || 3002;
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const { connectDB } = require("./db/database");
connectDB();

const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const productCategoryRoutes = require("./routes/product-category.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const { authenticate, requireAdmin } = require("./middlewares/auth");
const authRoutes = require("./routes/auth.routes");

app.use("/api/products", productRoutes);
app.use("/api/product-categories", productCategoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/dashboard", authenticate, requireAdmin, dashboardRoutes);
// Khởi động server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
