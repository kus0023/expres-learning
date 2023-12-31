const express = require('express');
const cookieParser = require('cookie-parser');
const path = require("path");
const expressLayouts = require('express-ejs-layouts'); //It will lookup for layout.ejs in /views by default.
const session = require('express-session'); //Used for session management
const passport = require('passport'); // used for authentication with different strategies
const flash = require('connect-flash'); // Sent some notification to users. 
const customMiddlewares = require('./config/middlewares');

//Add manual made local strategy
const localStrategyPassport = require('./config/passport_local_strategy');
const jwtStrategyPassport = require('./config/passport_jwt_strategy');

//Database
const db = require("./config/db");

const PORT = 8000;
const app = express();


//Midlewares

//Form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//Static files
app.use(express.static("./assets"));
app.use("/uploads", express.static("./uploads"));



//express ejs layout setup, It should be before routes middleware.
app.use(expressLayouts);
app.set("layout extractStyles", true); //link tag of current rendering ejs will placed inside layout(global) where <%- style %> is mentioned.
app.set("layout extractScripts", true); //Script tag of current rendering ejs will placed inside layout(global) where <%- script %> is mentioned.


//setup passport initialization.
app.use(session({
    name: "codeial-kus",
    //TODO: change the secret before the deplyment.
    secret: "xwertyuikmbvcxawefvhjiomntfdddfthjkmedcv",
    saveUninitialized: false,
    resave: false,
    store: require('./config/mongodb_session_store'),
    cookie: {
        maxAge: (1000 * 60 * 100),
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Flash message setup
app.use(flash());
app.use(customMiddlewares.setFlash); //custom middleware to set flash in response object of each req.

//Setting up routes in different folder
app.use('/', require('./routes')); //This will invoke index.js inside ./route by default.

//setting us the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error incountered", err);
        return;
    }

    console.log(`Server started on port: ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});


module.exports = app;

//chat socket server
require('./chat-engine')