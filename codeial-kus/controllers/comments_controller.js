const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports.create = async function(req, res){
    
    try {

        //Check if post id is correct or not
        const postDoc = await Post.findById(req.body.post_id);

        if(postDoc){

            //If post id is correct then save a comment with that post id
            const commentDoc = await Comment.create({
                content: req.body.content,
                post: req.body.post_id,
                user: req.user.id,
            });

            await commentDoc.populate('user')

            //Updating post with that comment id and saving it.
            postDoc.comments.push(commentDoc.id);

            const updatedPostDoc = await postDoc.save({isNew: false});

            // console.log(`Updated post doc has been saved. Post Doc: ${updatedPostDoc}`);
            req.flash('success', "Comment Added successfully");


            if(req.xhr){
                return res.status(201).json({success_message: "Comment Added successfully", error_message: null, result: {updatedPostDoc, commentDoc}})
            }

            return res.redirect('/');
        }else{

            if(req.xhr){
                return res.status(404).json({success_message: null, error_message: "Post is not found.", result: null})
            }

            req.flash('failure', "Post is not found");
            return res.redirect('/');
        }
    } catch (err) {
        console.log("Error in adding comments: ", err);

        if(req.xhr){
            return res.status(500).json({success_message: null, error_message: "Please try later", result: null});
        }

        return res.redirect('/');
    }
}


module.exports.delete = async function(req, res){
    try {

        // console.log("Finding post and comments");

        const postDoc = await Post.findById(req.query.post_id)
        const commentsDoc = await Comment.findById(req.query.comment_id);

        //if user is authenticated and comment belong to that post.
        //if post belong to that user then user can delete all the comments
        //if comment belong to that user
        const commentBelongsToPost = postDoc.comments.includes(commentsDoc._id);
        const postBelongsToAuthenticatedUser = req.user.id == postDoc.user._id;
        const commentBelongsToAuthenticatedUser = req.user.id == commentsDoc.user._id;
        
        // console.log("Checking for confition.");
        if(commentBelongsToPost && (postBelongsToAuthenticatedUser || commentBelongsToAuthenticatedUser)){

            // console.log("User is Eligible to delete.");
            //Find the index of comment id in post.
            const indexOfComment = postDoc.comments.findIndex((commentId)=>commentId == req.query.comment_id);
            postDoc.comments.splice(indexOfComment, 1);
            const updatedPostDoc = await postDoc.save();

            // console.log("Deleted comment from post.");

            //Delete the comment.
            const deleteCommentResult = await Comment.findByIdAndDelete(req.query.comment_id).exec();

            // console.log("Deleted Actual comment");

            req.flash('warning', "Comment deleted successfully");

            return res.redirect('/');
        }else{
            req.flash('failure', "Unauthorised User");
            console.log("Permission denied for user to delete the comment.");
            return res.redirect('/');
        }
        
    } catch (err) {
        console.log("Error in deleting comment", err);
        req.flash('failure', "Something Wrong happend while deleting the comment");
        return res.redirect('/');
    }
}