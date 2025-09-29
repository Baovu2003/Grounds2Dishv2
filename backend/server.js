const express = require("express");
const app = express();
const PORT = 5000;

// Middleware để parse JSON
app.use(express.json());

// Route cơ bản
app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

// API mẫu
app.get("/api/data", (req, res) => {
  res.json({ message: "This is data from backend API" });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
