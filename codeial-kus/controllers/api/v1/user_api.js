
const User = require('../../../models/User');
const jwt = require('jsonwebtoken');

module.exports.login = async function (req, res){
    try {
        let user = await User.findOne({email: req.body.email});


        if(!user || user.password !== req.body.password){

            return res.status(422).json({
                message: "User name or password is incorrect"
            });

        }

        user.password = undefined;
        
        return res.status(200).json({
            message: 'Successfully Logged In',
            token: jwt.sign(user.toJSON(), 'qwertyuiopasdfghjkl', 
            {expiresIn: '10000'}),
        });

    } catch (error) {
        console.log("Error in getting user from databse", error);
        
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}