const Post = require('../models/post');


module.exports.create = async function (req, res){
    
    try {
        const postDoc = await Post.create({
            content: req.body.content,
            user: req.user.id
        });

        // console.log(`Post saved ${postDoc} by user ${req.user.name}`);

        return res.redirect('back');
    } catch (err) {

        console.log("Error in saving post", err);
        return res.redirect('back');
    }
}