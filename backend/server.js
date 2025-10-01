const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;
// Middleware để parse JSON
app.use(express.json());
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const database = require("./db/database");
database.connect();

const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const productCategoryRoutes = require("./routes/product-category.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const { authenticate, requireAdmin } = require("./middlewares/auth");

app.use("/api/products", productRoutes);
app.use("/api/product-categories", productCategoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", authenticate, requireAdmin, dashboardRoutes);
// Khởi động server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
