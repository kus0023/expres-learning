const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports.create = async function(req, res){

    // console.log("Creating comments: ", req.body);

    let postDoc;

    //Check if post id is correct or not
    try{
        postDoc = await Post.findById(req.body.post_id);

    }catch(err){
        // console.log(`Post with Id: ${req.body.post_id} Not found.`);
        return res.redirect('/');
    }

    
    try {
        if(postDoc){

            //If post id is correct then save a comment with that post id
            const commentDoc = await Comment.create({
                content: req.body.content,
                post: req.body.post_id,
                user: req.user.id,
            });

            //Updating post with that comment id and saving it.
            postDoc.comments.push(commentDoc.id);

            const updatedPostDoc = await postDoc.save({isNew: false});

            // console.log(`Updated post doc has been saved. Post Doc: ${updatedPostDoc}`);

            return res.redirect('/');
        }else{
            throw "Error Post Doc not found";
        }
    } catch (err) {
        console.log("Error in adding comments: ", err);
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

            return res.redirect('/');
        }else{
            console.log("Permission denied for user to delete the comment.");
            return res.redirect('/');
        }
        
    } catch (err) {
        console.log("Error in deleting comment", err);
        return res.redirect('/');
    }
}