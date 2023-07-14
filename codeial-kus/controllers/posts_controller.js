const Post = require('../models/Post');
const Comment = require('../models/Comment');


module.exports.create = async function (req, res){
    
    try {
        const postDoc = await Post.create({
            content: req.body.content,
            user: req.user.id
        });

        await postDoc.populate('user', {password: false});

        if(req.xhr){
            return res.status(201).json({success_message: "Post Created successfully", error_message: null, result: {postDoc}});
        }

        // console.log(`Post saved ${postDoc} by user ${req.user.name}`);
        req.flash('success', "Post Created");
        return res.redirect('back');
    } catch (err) {
        req.flash('failure', "Post could not saved");
        console.log("Error in saving post", err);


        if(req.xhr){
            return res.status(500).json({success_message: null, error_message: "Please try later", result: null});
        }

        return res.redirect('back');
    }
}

module.exports.delete = async function (req, res){
    
    try {
        const postDoc = await Post.findById(req.query.post_id);

        // console.log(postDoc.user.id, req.user.id, typeof postDoc.user.id, typeof req.user.id);
        
        if(postDoc.user._id == req.user.id) //Checking if authenticated user is deleting post
        {
            // console.log("Deleting post");
            await postDoc.deleteOne();

            
            req.flash('warning', "Post deleted Successfully");

            // console.log("deleting comments");
            const deleteCommentsResult = await Comment.deleteMany({post: postDoc._id}).exec();

            // console.log("Post and comment deleted, comment delete result: ", deleteCommentsResult);

            req.flash('warning', "Comments Deleted Successfully");

            if(req.xhr){
                return res.status(202).json({success_message: "Post Deleted", error_message: null, result: {postDoc}});
            }

            return res.redirect('back');
        }else{
            req.flash('failure', "Unauthorized");
            // console.log("Not the right user to delete the post.");
            if(req.xhr){
                return res.status(401).json({success_message: null, error_message: "Unauthorized", result: null});
            }

            return res.redirect('back');
        }
    } catch (err) {
        req.flash('failure', "Something went wrong !");
        console.log("Error in Deleting post", err);

        if(req.xhr){
            return res.status(500).json({success_message: null, error_message: "Please try later", result: null});
        }

        return res.redirect('back');
    }
}