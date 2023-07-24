const mongoose = require('mongoose');

const URL = "mongodb://localhost:27017/codeial_dev"

mongoose.connect(URL);

const db = mongoose.connection;

db.on('error', (error)=>{
    console.log("Database connecion failure. Description: ", error);
});

db.once('open', ()=>{
    console.log("Yay! Connected to Database.");
});

module.exports = db;

