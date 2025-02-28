const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const authrouter = require('./Routes/Authrouter');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const PORT = process.env.PORT || 8080;
const Mongo_url = process.env.MONGO_CONN;

mongoose
  .connect(Mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/auth', authrouter);

// Test Route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
