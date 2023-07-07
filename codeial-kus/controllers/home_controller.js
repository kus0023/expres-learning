//module.exports.actions = fn

module.exports.home = function (req, res) {

    return res.render("home", {title: "Home page"});
}