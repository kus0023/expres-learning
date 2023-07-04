const express = require('express');
const PORT = 8000;
const app = express();

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
