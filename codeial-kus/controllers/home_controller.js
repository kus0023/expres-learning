//module.exports.actions = fn

const Post = require('../models/Post');

module.exports.home = async function (req, res) {

    try {
        const postDocs = await Post.find({}).populate('user')
        .populate({path: 'comments', model: 'Comment', populate: 'user'}).sort({createdAt: -1});

        return res.render("home", {title: "Home page", posts: postDocs, user: req.user});
    } catch (err) {
        console.log("Could not fetch Posts", err);
        return res.status(500).send("Internal Server Error.");
    }

}