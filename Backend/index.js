const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const cors = require('cors');

const UserModel = require('./Models/User');
const authrouter = require('./Routes/Authrouter');

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const Mongo_url = process.env.MONGO_CONN;

// MongoDB connection
mongoose
  .connect(Mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/auth', authrouter);

// Signup endpoint
app.post("/dbauth/signup", async (req, res) => {
  try {
    const { name, lastname, email, password, dob, phone, gender } = req.body;

    // Basic validation for required fields
    if (!name || !lastname || !email || !password || !dob || !phone || !gender) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new UserModel({
      name,
      lastname,
      email,
      password: hashedPassword,
      dob,
      phone,
      gender,
    });

    // Save the user to MongoDB
    await newUser.save();

    // Send a success response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in /dbauth/signup:", error.message);
    res.status(500).json({
      message: "An error occurred during signup",
      error: error.message,
    });
  }
});

// Test endpoint
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
