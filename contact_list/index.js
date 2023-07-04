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

    Contact.find({}).then(contactList=>{
        // console.log("Fetched contacts from DB", contactList);

        //send the contact to render on page
        return res.render('contact-list', {
            contact_list: contactList
        });
    }).catch(err=>{
        console.log("Error in fetching contacts", err);

        return res.render("error", {error: "Internal server error. Cannot fetch Contacts."});
    });

    

});

app.post('/contacts', (req, res)=>{

    console.log("Adding Form data: ", req.body);

    //Creating a new contact, it will return a promise
    Contact.create({name: req.body.name, phone_number: req.body.phone_number})
    
    .then(contactDoc=>{
        //getting the new contact document
        console.log("Document created", contactDoc);
        return res.redirect('contacts');

    }).catch(err=>{

        console.log("Failed to save data in database",err);

        //TODO: ERROR page creation.
        return res.render('error', {error: "Contact not saved. Internal Server Error"});
    });
    
});

app.delete('/contacts/:id', (req, res)=>{

    const id = req.params.id;

    console.log('Deleting: ', id);

    //Find and delete by ID
    Contact.findByIdAndDelete(id).then((doc)=>{
        console.log("Deleted", doc);
        
        return res.status(204).send();
    }).catch(err=>{
        console.log("Error in deleting contact", err);
        return;
    })
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