
const User = require("../models/User")

module.exports.viewProfile = async function (req, res) {
    try {

        const profileUser = await User.findById(req.query.user_id);

        return res.render("user_profile", { title: "Profile page", user_profile: profileUser });
        
    } catch (err) {
        console.log("Error fetching profile data", err);
        return res.render('back');
    }
    
}

module.exports.updateProfile = async function (req, res) {
    try {

        // console.log(req.user, req.body.user_id);

        if(req.user._id == req.body.user_id){
            const user = await User.findById(req.body.user_id);
            if(req.body.user_name.trim() != ""){
                const result = await user.updateOne({name: req.body.user_name}).exec();
                console.log("profile updated.");

                return res.render('back');
            }else{

                console.log("name is empty.");
                return res.render('back');
            }
        }else{
            console.log("User is not authorised to update profile.");
            return res.redirect('back');
        }
        
        
    } catch (err) {
        console.log("Error updating profile data", err);
        return res.render('back');
    }
    
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

    // console.log("Trying to create a user");

    //Check if password and confirm password is same or not.
    if (req.body.password != req.body.confirm_password) {
        console.log("Password is not Matching.");
        return res.redirect('back');
    }

    try {

        //check if user is alredy present or not. if not then create a new user. otherwise do not create.

        const userExists = await User.findOne({ email: req.body.email });

        if (!userExists) {
            // console.log("Creating user");
            // console.log(req.body);

            const userDoc = await User.create(req.body);

            // console.log("User created Successfully.", userDoc);

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