const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone_number: {
        type: String,
        require: true
    }
});


const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;