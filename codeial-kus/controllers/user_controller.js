module.exports.profile = function (req, res) {
    return res.render("user_profile");
}

//controller for adding user
module.exports.addUser = function (req, res){

    console.log("User added Successfully.");
    return res.redirect("/users/list");
}

//User list controller
module.exports.showUsers = function(req, res){
    
    return res.render('user_list');
}