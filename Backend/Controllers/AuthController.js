const UserModel = require('../Models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Function to calculate age from DOB
const calculateAge = (dob) => {
  if (!dob) return "N/A";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const signup = async (req, res) => {
  try {
    const { name, lastname, email, password, dob, phone, gender, weight, heightFeet, heightInches, goalWeight } = req.body;
    
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const age = calculateAge(dob);

    const newUser = new UserModel({ 
      name, 
      lastname, 
      email, 
      password: hashedPassword, 
      dob, 
      age, 
      phone, 
      gender,
      weight, 
      heightFeet, 
      heightInches, 
      goalWeight 
    });

    await newUser.save();

    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error in creating user", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        age: calculateAge(user.dob),
        gender: user.gender,
        weight: user.weight,
        heightFeet: user.heightFeet,
        heightInches: user.heightInches,
        goalWeight: user.goalWeight
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error during login", error: err.message });
  }
};

module.exports = { signup, login };
