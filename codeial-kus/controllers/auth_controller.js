module.exports.getSignin = function(req, res){

    return res.render('signin', {title: "Login"}); 
}

module.exports.getSignup = function(req, res){
    return res.render('signup', {title: "Register"});
}

module.exports.register = function (req, res){

    console.log("User registered.");
    return res.send();
}

module.exports.login = function (req, res){

    console.log("User Loged in.");
    return res.send();
}