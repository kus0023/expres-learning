const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy({
    usernameField: 'email'
}, async function (email, password, done) {

    try {

        //Find a user and establish the identity
        const user = await User.findOne({ email: email });

        if (!user || user.password != password) {
            console.log("Invalid username/password");
            return done(null, false);
        }

        return done(null, user);

    } catch (error) {
        console.log("Error in Passport: ", error);
        return done(error)
    }

});

passport.use(localStrategy);


//serializing the user to decide which key to keep in cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


//deserializing the user from the key in the cookie.

passport.deserializeUser( async function (id, done) {
    try {

        //Find a user and establish the identity
        const user = await User.findById(id);

        if (!user) {
            console.log("Invalid username/password");
            return done(null, false);
        }

        return done(null, user);

    } catch (error) {
        console.log("Error in Passport: ", error);
    }
});


passport.checkAuthentication = function (req, res, next){

    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next){

    if(req.isAuthenticated()){

        res.locals.user = req.user;
        res.locals.user.password = undefined;
    }
    
    return next();
}

passport.checkAlreadyLoggedIn = function (req, res, next){

    if(!req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/profile');
}

passport.logoutUser = function (req, res, next){

    if(req.isAuthenticated()){
        req.logout(function(err) {
            if (err) { return next(err); }
            return res.redirect('/users/sign-in');
          });
    }
}

module.exports = passport;