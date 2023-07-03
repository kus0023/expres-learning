const mongoose = require('mongoose');

async function connectToDb() {
    const URL="mongodb://127.0.0.1:27017/contact_list_db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1"
    await mongoose.connect(URL);

}

connectToDb().then(()=>{
    console.log('Connected to Database Successfully.');
}).catch(err=>{
    console.log('Failed to connect to DB.', err);
});

console.log("Runnning required.");