const UserModel = require('../Models/User');
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const { name, lastname, email, password, dob, phone, gender } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            lastname,
            email,
            password: hashedPassword,
            dob,
            phone,
            gender
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Error in creating user", error: err.message, success: false });
    }
};
const login = async (req, res) => {
    try {
        const { name, lastname, email, password, dob, phone, gender } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if ( !existingUser) {
            return res.status(403).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            name,
            lastname,
            email,
            password: hashedPassword,
            dob,
            phone,
            gender
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Error in creating user", error: err.message, success: false });
    }
};

module.exports = {
    signup
};
