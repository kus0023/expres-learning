const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
    },
    post:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'post',
    }
}, {timestamps: true});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;