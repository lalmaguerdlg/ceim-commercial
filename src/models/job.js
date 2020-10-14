const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    from: String,
    to: [String],
    subject: String,
    message: String,
    status: { type: String, enum: ['New', 'Processing', 'Failed', 'Completed'] },
    created_at: { type: Date, default: Date.now() },
    sent_at: { type: Date, default: Date.now() },
}, { collection: 'emails' } );

module.exports = mongoose.model('Email', EmailSchema);