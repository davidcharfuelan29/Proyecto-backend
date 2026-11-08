const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");

app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', projectRoutes);

module.exports = app;   