const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get("/", (req, res) => {
  res.send("💥 Backend działa!");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "It is working 🎉" });
});

app.listen(PORT, () => {
  console.log(`🚀 Serwer is listening: ${PORT}`);
});
