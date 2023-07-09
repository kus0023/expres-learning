const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){

    console.log("Creating comments: ", req.body);

    let postDoc;

    //Check if post id is correct or not
    try{
        postDoc = await Post.findById(req.body.post_id);

    }catch(err){
        console.log(`Post with Id: ${req.body.post_id} Not found.`);
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

            console.log(`Updated post doc has been saved. Post Doc: ${updatedPostDoc}`);

            return res.redirect('/');
        }else{
            throw "Error Post Doc not found";
        }
    } catch (err) {
        console.log("Error in adding comments: ", err);
        return res.redirect('/');
    }
}
