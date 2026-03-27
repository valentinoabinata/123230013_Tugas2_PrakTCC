// Import Package dan File
const express = require("express");
const sequelize = require("./config/database");
const catatanRoutes = require("./routes/catatanRoutes");
const path = require("path");

// Inisialisasi Express dan Cors
const app = express();
const cors = require("cors");

// Izinkan origin frontend lokal
app.use(cors({
  origin: ['http://localhost', 'http://localhost:5173', 'http://127.0.0.1:5500', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware untuk parsing JSON
app.use(express.json());

// Sajikan file statis frontend dari folder public
app.use(express.static(path.join(__dirname, "public")));

// Route dasar untuk testing
app.get("/ping", (req, res) => {
  res.send("Server Catatan berjalan!");
});

// Setting Routes
require("./schema/Catatan"); // Untuk generate Tabel catatan
app.use("/api/v1/catatan", catatanRoutes);

// Sync Database dan Jalankan Server
const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
