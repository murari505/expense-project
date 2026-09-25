const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Employee Leave API is running"
    });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Leave routes
app.use("/api", leaveRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
