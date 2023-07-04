//Required modules
const express = require('express');
const path = require('path');

//Global variable
const PORT = 8000;

//Database connection before setting express app.
require('./config/mymongodb.js');

//using Schema
const Contact = require('./model/contact.js');

//Setting express app
const app = express();


//Setup for express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(express.static('static'))
app.use(express.urlencoded());


//contact list variable for global scope.
const contactList = [
    {
        name: "Kus",
        phone_number: "1234567890"
    },
    {
        name: "John",
        phone_number: "1234567890"
    },
    {
        name: "Smith",
        phone_number: "1234567890"
    },
    {
        name: "Kayle",
        phone_number: "1234567890"
    },
    {
        name: "Martin",
        phone_number: "1234567890"
    },
    {
        name: "Justin",
        phone_number: "1234567890"
    },
];

// Routes are defined

app.get('/', (req, res)=>{
    return res.render('home');
});

app.get('/profile', (req, res)=>{

    const skills = ['Java', 'Javascript', 'Python', 'C/C++', 'Microservices', 'React', 'Git'];
    
    return res.render('profile', {skills});
});

app.get('/contacts', (req, res)=>{

    return res.render('contact-list', {
        contact_list: contactList
    })

});

app.post('/contacts', (req, res)=>{

    console.log("Adding Form data: ", req.body);

    contactList.push(req.body);

    return res.redirect('contacts');
});

app.delete('/contacts/:index', (req, res)=>{

    const index = req.params.index;

    console.log('Deleting', contactList[index]);

    contactList.splice(index, 1);

    return res.status(204).send();
})

app.get('/contact-form', (req, res)=>{
    return res.render('contact-form');
})



// Setting up the listener and on port
app.listen(PORT, (err)=>{
    if(err){
        console.log("Error", err);

        return;
    }

    console.log('Server started on PORT:', PORT);
    console.log('Visit: http://localhost:'+PORT);
});