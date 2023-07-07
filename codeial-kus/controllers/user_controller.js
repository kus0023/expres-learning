
const users = ['John Smith', 'Martin Roy', 'Karry Minati']

module.exports.profile = function (req, res) {
    return res.render("user_profile", {title: "Profile page"});
}

//controller for adding user
module.exports.addUser = function (req, res){

    console.log("User added Successfully.");
    users.push(req.body.username);
    return res.redirect("/users/list");
}

//User list controller
module.exports.showUsers = function(req, res){
    
    return res.render('user_list', {users, title: "List of Users"});
}

//use to get the Page to login
module.exports.getSignIn = function(req, res){

    return res.render('user_sign_in', {title: "Login"}); 
}

//use to get page to register
module.exports.getSignUp = function(req, res){
    return res.render('user_sign_up', {title: "Register"});
}

//use to register user in database
module.exports.register = function (req, res){

    console.log("User registered.");
    return res.send();
}

// use to check login status from db
module.exports.login = function (req, res){

    console.log("User Loged in.");
    return res.send();
}