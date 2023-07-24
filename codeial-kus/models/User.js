const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');

const AVATAR_PATH = path.join(__dirname,'..', '/uploads/users/profile');

const userSchema = new mongoose.Schema({
    email: {
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
    },
    avatar: {
        type: String
    },

}, 
{ timestamps: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, AVATAR_PATH)
    },
    filename: function (req, file, cb) {
        
        let extension = file.originalname.split(".");
        extension = extension[extension.length - 1];

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+"."+extension);
    }
});

userSchema.statics.getAvatarPath = AVATAR_PATH;
userSchema.statics.userAvatarUpload = multer({ storage: storage }).single('avatar');


const User = mongoose.model('User', userSchema);

module.exports = User;