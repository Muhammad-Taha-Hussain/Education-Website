const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    cPassword: {
        type: String,
        required: true
    },
    pic: {
        title: String,
        description: String,
        image: String
    }
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('Password') || this.isNew) {
        this.Password = await bcrypt.hash(this.Password, 10);
        this.cPassword = await bcrypt.hash(this.cPassword, 10);
    }
    next();
});

//creating the collection
const Register = new mongoose.model("userRegisterDetail", userSchema)

module.exports = Register;