const express = require('express');
const path = require("path");
const expressLayouts = require('express-ejs-layouts'); //It will lookup for layout.ejs in /views by default.

const PORT = 8000;
const app = express();

//setting us the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Midlewares

//Static files
app.use(express.static("./assets"));

//Form data
app.use(express.urlencoded());

//express ejs layout setup, It should be before routes middleware.
app.use(expressLayouts);
app.set("layout extractStyles", true); //link tag of current rendering ejs will placed inside layout(global) where <%- style %> is mentioned.
app.set("layout extractStyles", true); //styyle tag of current rendering ejs will placed inside layout(global) where <%- script %> is mentioned.


//Setting up routes in different folder
app.use('/', require('./routes')); //This will invoke index.js inside ./route by default.

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error incountered", err);
        return;
    }

    console.log(`Server started on port: ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});
