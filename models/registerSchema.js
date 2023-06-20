const mongoose = require("mongoose");


const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
  password: {
        type: String,
        required: true,
    },
   
   
});

// model
const register = new mongoose.model("register",registerSchema);

module.exports = register;