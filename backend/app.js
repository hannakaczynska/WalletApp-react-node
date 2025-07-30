require('dotenv').config();

const express = require("express");
const cors = require("cors");

const transactionRoutes = require("../backend/routes/transactionRoutes.js");
const statisticsRoutes = require("../backend/routes/statisticsRoutes.js");
const userRoutes = require("../backend/routes/userRoutes.js");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  })
);

app.use(express.json());

app.use("/", userRoutes);
app.use("/", transactionRoutes);
app.use("/", statisticsRoutes);

app.get("/", (req, res) => {
  res.send("💥 Backend działa!");
});

app.post("/home", (req, res) => {
  const { name, email } = req.body;
  res.json({ message: "User created", user: { name, email } });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})


module.exports = app;
