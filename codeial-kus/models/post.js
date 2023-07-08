const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
    }
},
{timestamps: true});


const Post = mongoose.model('post', postSchema);

module.exports = Post;