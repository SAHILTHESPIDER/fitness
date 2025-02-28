const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true, unique: true, match: /^[0-9]{10}$/ },
    dob: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
    password: { type: String, required: true },
    weight: { type: Number, required: true },  // Storing weight in kg
    heightFeet: { type: Number, required: true },  // Storing feet part of height
    heightInches: { type: Number, required: true }, // Storing inches part of height
    goalWeight: { type: Number, required: true } // Storing goal weight in kg
});

const UserModel = mongoose.model('Usertest', userSchema);
module.exports = UserModel;
