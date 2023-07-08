
const Users = require("../models/user")

module.exports.profile = function (req, res) {
    return res.render("user_profile", { title: "Profile page" });
}

//controller for adding user
module.exports.addUser = function (req, res) {

    console.log("User added Successfully.");
    users.push(req.body.username);
    return res.redirect("/users/list");
}

//User list controller
module.exports.showUsers = function (req, res) {

    return res.render('user_list', { users, title: "List of Users" });
}

//use to get the Page to login
module.exports.getSignIn = function (req, res) {

    return res.render('user_sign_in', { title: "Login" });
}

//use to get page to register
module.exports.getSignUp = function (req, res) {
    return res.render('user_sign_up', { title: "Register" });
}

//use to register user in database
module.exports.register = async function (req, res) {

    console.log("Trying to create a user");

    //Check if password and confirm password is same or not.
    if (req.body.password != req.body.confirm_password) {
        console.log("Password is not Matching.");
        return res.redirect('back');
    }

    try {

        //check if user is alredy present or not. if not then create a new user. otherwise do not create.

        const userExists = await Users.findOne({ email: req.body.email });
        const nullUser = await Users.findOne({emails: null});
        console.log("Null users: ", nullUser);

        if (!userExists) {
            console.log("Creating user");
            console.log(req.body);

            const userDoc = await Users.create(req.body);

            console.log("User created Successfully.", userDoc);

            return res.redirect('/users/sign-in');
        } else {
            console.log("User already exists");
            return res.redirect('back')
        }

    } catch (error) {
        console.log("Error in creating User: ", error);
        return res.redirect('back');
    }

}

// Now using passport to handle login and session managment.
module.exports.login = function (req, res) {

    return res.redirect("/");
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect("/");
}