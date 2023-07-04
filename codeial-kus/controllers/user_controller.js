module.exports.profile = function (req, res) {
    return res.send("<h1>User Profile</h1>");
}

//controller for adding user
module.exports.addUser = function (req, res){

    console.log("User added Successfully.");
    return res.redirect("/users/list");
}

//User list controller
module.exports.showUsers = function(req, res){
    const page = `
    <h1>Users Lists</h1>
    <br>
    <br>
    <form method='post' action='/users/add' >Submit This form with no data: <button type='submit'>Submit</button></form>
    `
    return res.send(page);
}