const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // OK for local dev
const cors = require('cors');

const reviewsRouter = require('./Routes/reviewsRouter');
const authrouter = require('./Routes/Authrouter');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ===== MongoDB Connection =====
const PORT = process.env.PORT || 8080;
const Mongo_url = process.env.MONGO_CONN;

// 🔴 Safety check
if (!Mongo_url) {
  console.error('❌ MONGO_CONN is not defined');
  process.exit(1);
}

mongoose
  .connect(Mongo_url)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ Could not connect to MongoDB', err);
    process.exit(1);
  });

// ===== Routes =====
app.use('/auth', authrouter);
app.use('/api/reviews', reviewsRouter);

// Test Route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
