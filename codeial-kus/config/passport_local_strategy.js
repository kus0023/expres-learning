const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy({
    usernameField: 'email'
});

passport.use(localStrategy, async function (email, password, done) {

    try {

        //Find a user and establish the identity
        const user = await User.findOne({ email: email });

        if (!user || user.password != password) {
            console.log("Invalid username/password");
            return done(null, false);
        }

        //Do not expose password to users.
        user.password = undefined;

        return done(null, user);

    } catch (error) {
        console.log("Error in Passport: ", error);
        return done(error)
    }

});


//serializing the user to decide which key to keep in cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


//deserializing the user from the key in the cookie.

passport.deserializeUser( async function (id, done) {
    try {

        //Find a user and establish the identity
        const user = await User.findById(id);

        if (!user || user.password != password) {
            console.log("Invalid username/password");
            return done(null, false);
        }

        user.password = undefined;

        return done(null, user);

    } catch (error) {
        console.log("Error in Passport: ", error);
    }
});