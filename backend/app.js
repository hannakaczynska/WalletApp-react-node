require('dotenv').config();

const express = require("express");
const cors = require("cors");

const transactionRoutes = require("../backend/routes/transactionRoutes.js");
const statisticsRoutes = require("../backend/routes/statisticsRoutes.js");
const checkBlacklist = require("../backend/middlewares/tokenBlacklist.js");
const userRoutes = require("../backend/routes/userRoutes.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://wallet-app-project.netlify.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", userRoutes);
app.use("/", checkBlacklist, transactionRoutes);
app.use("/", checkBlacklist, statisticsRoutes);

app.get("/", (req, res) => {
  res.send("💥 Backend działa!");
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})


module.exports = app;
