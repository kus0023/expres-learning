const Post = require('../../../models/Post');
const User = require('../../../models/User');
const Comment = require('../../../models/Comment');

module.exports.getAll = async function(req, res){

    try {
        const postDocs = await Post.find({}).populate('user')
        .populate({path: 'comments', model: 'Comment', populate: 'user' }).sort({createdAt: -1});

        const friendsDoc = await User.find({});

        return res.status(200).json({posts: postDocs, friends: friendsDoc});

    } catch (err) {
        console.log("Could not fetch Posts", err);
        return res.status(500).json({
            message: "Something went wrong!"
        });
    }
}


module.exports.delete = async function(req, res){

    try {
        const postDoc = await Post.findById(req.query.post_id);

        const postDeletedResult = await postDoc.deleteOne();

        const deleteCommentsResult = await Comment.deleteMany({post: postDoc._id}).exec();

        return res.status(200).json({
            message: "successfully deleted.",
            post: postDeletedResult,
            comments: deleteCommentsResult
        });
        
    } catch (err) {
        req.flash('failure', "Something went wrong !");
        console.log("Error in Deleting post", err);

        if(req.xhr){
            return res.status(500).json({success_message: null, error_message: "Please try later", result: null});
        }

        return res.redirect('back');
    }
}