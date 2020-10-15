const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: { type: String, required: true },
    subject: String,
    message: String,
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Contact', ContactSchema);