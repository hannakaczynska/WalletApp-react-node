require("dotenv").config();

const express = require("express");
const cors = require("cors");

const transactionRoutes = require("../backend/routes/transactionRoutes.js");
const statisticsRoutes = require("../backend/routes/statisticsRoutes.js");
const checkBlacklist = require("../backend/middlewares/tokenBlacklist.js");
const userRoutes = require("../backend/routes/userRoutes.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const seedDemoData = require("./seedDemoData");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://wallet-app-project.netlify.app",
  "https://wallet-app-fullstack.netlify.app/"
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
  }),
);

app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl: "https://unpkg.com/swagger-ui-dist/swagger-ui.css",
    customJs: [
      "https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js",
      "https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js",
    ],
  })
);

app.get("/api/seed-demo", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    await seedDemoData();

    return res.status(200).json({
      message: "Demo data refreshed successfully",
    });
  } catch (error) {
    console.error("Demo seed error:", error);

    return res.status(500).json({
      message: "Failed to refresh demo data",
      error: error.message,
      stack: error.stack,
    });
  }
});

app.use("/", userRoutes);
app.use("/", checkBlacklist, transactionRoutes);
app.use("/", checkBlacklist, statisticsRoutes);

app.get("/", (req, res) => {
  res.send("💥 Backend działa!");
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = app;
