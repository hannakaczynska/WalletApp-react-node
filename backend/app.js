const express = require("express");

const transactionRoutes = require("../backend/routes/transactionRoutes.js");
const statisticsRoutes = require("../backend/routes/statisticsRoutes.js");
const userRoutes = require("../backend/routes/userRoutes.js");

const app = express();

require('dotenv').config();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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
