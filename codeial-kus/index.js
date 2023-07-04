const express = require('express');
const path = require("path");

const PORT = 8000;
const app = express();

//setting us the view engine
app.set("view engine",  "ejs");
app.set("views", path.join(__dirname, "views"));

//Setting up routes in different folder
app.use('/', require('./routes')); //This will invoke index.js inside ./route by default.

app.listen(PORT, (err)=>{
    if(err){
        console.log("Error incountered", err);
        return;
    }

    console.log(`Server started on port: ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});
