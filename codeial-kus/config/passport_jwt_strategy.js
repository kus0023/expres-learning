const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwtFromHeader = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

const options = {
    jwtFromRequest: extractJwtFromHeader.fromAuthHeaderAsBearerToken(),
    secretOrKey: "qwertyuiopasdfghjkl"
}

passport.use(new jwtStrategy(options, async function(jwt_payload, done) {

    try {

        const user = await User.findById(jwt_payload._id);

        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
        
    } catch (err) {
        console.log("Error in finding user ", err);
        done("AUTHENTICATION FAILURE. JWT TOKEN IS INCORRECT.");
    }
    
}));


module.exports = passport;