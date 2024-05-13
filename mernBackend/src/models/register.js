const mongoose = require("mongoose");

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
        image: Buffer
    }
})

//creating the collection
const Register = new mongoose.model("userRegisterDetail", userSchema)

module.exports = Register;