const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true, unique: true, match: /^[0-9]{10}$/ },
    dob: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    email: { type: String, required: true, unique: true, match: /\S+@\S+\.\S+/ },
    password: { type: String, required: true }
});

const UserModel = mongoose.model('Usertest', userSchema);
module.exports = UserModel;
