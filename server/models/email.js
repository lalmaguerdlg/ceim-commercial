const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: [String], required: true },
    cc: [String],
    subject: String,
    template: { 
        name: { type: String, required: true },
        data: Object,
    },
    created_at: { type: Date, default: Date.now() },
    status: { type: String, enum: ['New', 'Processing', 'Failed', 'Sent'], default: 'New' },
    sent_at: Date,
    attempts: { type: Number, default: 0 },
    last_attempt_at: Date,
}, { collection: 'emails' } );

module.exports = mongoose.model('Email', EmailSchema);