//module.exports.actions = fn

const Post = require('../models/post');

module.exports.home = async function (req, res) {

    try {
        const postDocs = await Post.find({}).populate('user');

        return res.render("home", {title: "Home page", posts: postDocs, user: req.user});
    } catch (err) {
        console.log("Could not fetch Posts", err);
        return res.status(500).send("Internal Server Error.");
    }

}