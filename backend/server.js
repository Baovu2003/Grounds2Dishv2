const express = require("express");
const app = express();
const PORT = 5000;

// Middleware để parse JSON
app.use(express.json());
app.use("/uploads", express.static("uploads"));
require("dotenv").config();

const database = require("./db/database");
database.connect();

const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
// Khởi động server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
