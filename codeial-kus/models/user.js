const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    emails:{
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const User = mongoose.model('user', userSchema);

module.exports = User;