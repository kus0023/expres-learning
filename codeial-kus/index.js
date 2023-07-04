const express = require('express');

const PORT = 8000;

const app = express();

app.listen(PORT, (err)=>{
    if(err){
        console.log("Error incountered", err);
        return;
    }

    console.log(`Server started on port: ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});
