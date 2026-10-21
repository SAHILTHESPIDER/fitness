require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const origins = (process.env.CORS_ORIGINS || "http://localhost:5173,https://herrcule-power.vercel.app")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || origins.includes(origin)) callback(null, true);
    else callback(null, false);
  },
}));
app.use(express.json({ limit: "1mb" }));

app.get("/ping", (req, res) => res.json({ ok: true }));
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    ai: Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim()),
    smtp: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
  });
});

app.use("/auth", require("./Routes/Authrouter"));
app.use("/api/logs", require("./Routes/logsRouter"));
app.use("/api/reviews", require("./Routes/reviewsRouter"));
app.use("/api/ai", require("./Routes/aiRouter"));
app.use((req, res) => res.status(404).json({ success: false, message: "Not found." }));

if (!process.env.MONGO_CONN) {
  console.error("MONGO_CONN is missing.");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_CONN)
  .then(() => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`API listening on ${port}`));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
